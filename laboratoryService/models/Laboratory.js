const sequelize = require('./db');
const { DataTypes } = require('sequelize');

//创建一个模型对象
const Laboratory = sequelize.define("Laboratory", {
    laboratoryId: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    seat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, //阻止表名复数化，与模型不同
    paranoid: true //从此以后，该表的数据不会真正删除，而是增加一列deletedAt,记录删除的时间
});


module.exports = Laboratory;