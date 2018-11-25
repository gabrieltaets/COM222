module.exports = function(sequelize, DataTypes) {
    let OrderItem = sequelize.define('OrderItem', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ISBN: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        qty: DataTypes.INTEGER,
        price: DataTypes.DOUBLE
    });

    return OrderItem;
}
