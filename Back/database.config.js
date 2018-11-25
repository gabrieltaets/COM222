module.exports = {
    username: 'root',
    password: null,
    host: 'localhost',
    port: '3306',
    database: 'com222',
    dialect: 'mysql',
    timestamps: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
