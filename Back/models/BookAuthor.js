module.exports = function(sequelize, DataTypes){
    const BookAuthor = sequelize.define('BookAuthor', {
        authorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: 'nameF'
        },
        lastName: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: 'nameL'
        }
    }, {
        tableName: 'bookauthors',
        timestamps: false
    });

    return BookAuthor;
};
