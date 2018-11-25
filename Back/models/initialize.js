const Book = require('./Book');
const BookCategory = require('./BookCategory');
const BookAuthor = require('./BookAuthor');
const User = require('./User');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

module.exports = (sequelize) => {

    sequelize.import('Book', Book);
    sequelize.import('BookCategory', BookCategory);
    sequelize.import('BookAuthor', BookAuthor);
    sequelize.import('User', User);
    sequelize.import('Order', Order);
    sequelize.import('OrderItem', OrderItem);

    sequelize.models.Book.belongsToMany(sequelize.models.BookCategory, {
        through: 'bookcategoriesbooks',
        as: 'categories',
        foreignKey: 'ISBN',
        otherKey: 'categoryId'
    });

    sequelize.models.Book.belongsToMany(sequelize.models.BookAuthor, {
        through: 'bookauthorsbooks',
        as: 'authors',
        foreignKey: 'ISBN',
        otherKey: 'authorId'
    });

    sequelize.models.BookCategory.belongsToMany(sequelize.models.Book, {
        through: 'bookcategoriesbooks',
        as: 'books',
        foreignKey: 'categoryId',
        otherKey: 'ISBN'
    });

    sequelize.models.BookAuthor.belongsToMany(sequelize.models.Book, {
        through: 'bookauthorsbooks',
        as: 'books',
        foreignKey: 'authorId',
        otherKey: 'ISBN'
    });

    sequelize.models.User.hasMany(sequelize.models.Order);
    sequelize.models.Order.hasMany(sequelize.models.OrderItem, {
        foreignKey: 'orderId'
    });

    sequelize.sync();

    return {
        Book: sequelize.models.Book,
        BookCategory: sequelize.models.BookCategory,
        BookAuthor: sequelize.models.BookAuthor,
        User: sequelize.models.User,
        Order: sequelize.models.Order,
        OrderItem: sequelize.models.OrderItem
    }
};
