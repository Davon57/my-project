const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laboratorydb', 'root', 'Wang_123fei', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+8:00',
    // dialectOptions: {
    //     useUTC: false
    // },
    logging: null //关闭输出日志
});

module.exports = sequelize;