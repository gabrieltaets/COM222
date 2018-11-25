module.exports = function(sequelize, DataTypes){
    const Book = sequelize.define('Book', {
        ISBN: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(8000),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        pubDate: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        edition: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        pages: {
            type: DataTypes.STRING(5),
            allowNull: false
        }
    }, {
        tableName: 'bookdescriptions',
        timestamps: false
    });

    return Book;
};
