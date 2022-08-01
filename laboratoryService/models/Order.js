const sequelize = require('./db');
const { DataTypes } = require('sequelize');

//创建一个模型对象
const Order = sequelize.define("Order", {
    laboratoryId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ipone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderTime: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: false,
    freezeTableName: true, //阻止表名复数化，与模型不同
    paranoid: true //从此以后，该表的数据不会真正删除，而是增加一列deletedAt,记录删除的时间
});


module.exports = Order;