module.exports = function(sequelize, DataTypes){
    let Order = sequelize.define('Order', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderDate: DataTypes.STRING(20),
        total: DataTypes.DOUBLE
    });

    return Order;
}
