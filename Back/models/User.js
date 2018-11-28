const crypto = require('crypto');
const to = require('await-to-js').to;

function hash(pwd, salt) {
    let pass = crypto.pbkdf2Sync(pwd, salt, 1000, 64, 'sha512').toString('hex');
    return pass;
}

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(200),
            set(pwd) {
                let salt = crypto.randomBytes(16).toString('hex');
                this.setDataValue('salt', salt);
                this.setDataValue('password', hash(pwd, salt));
            },
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
        },
        salt: DataTypes.STRING(50),
        name: DataTypes.STRING(50),
        address: DataTypes.STRING(100),
        city: DataTypes.STRING(20),
        state: DataTypes.STRING(5),
        phone: DataTypes.STRING(15),
        token: DataTypes.STRING(200),
    });

    User.authenticate = async function(login, pwd) {
        if(typeof login !== 'string' || typeof pwd !== 'string') return Promise.resolve(null);
        let [err, user] = await to(User.findByPk(login));
        if(err || !user) return Promise.resolve(null);
        if(hash(pwd, user.salt) !== user.password && pwd !== user.token) return Promise.resolve(null);
        if(!user.token || user.token === '') {
            user.token = hash(login, crypto.randomBytes(16).toString('hex'));
            [err, user] = await to(user.save());
            if(err) return Promise.reject('Something went wrong.');
        }
        return User.findByPk(login, {
            attributes: {
                exclude: ['password', 'salt', 'createdAt', 'updatedAt']
            }
        });
    }

    User.logout = async function(login, token) {
        if(typeof login !== 'string' || typeof token !== 'string') return Promise.reject('Login and Token must be strings');
        let [err, user] = await to(User.findByPk(login));
        if(err || !user) return Promise.reject('Invalid login');
        if(token !== user.token) return  Promise.reject('Invalid token');
        user.token = null;
        [err, user] = await to(user.save());
        if(err) return Promise.reject('Something went wrong.');
        return Promise.resolve();
    }

    return User;
}
