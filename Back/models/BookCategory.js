module.exports = function(sequelize, DataTypes){
    const BookCategory = sequelize.define('BookCategory', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'bookcategories',
        timestamps: false
    });

    return BookCategory;
};
