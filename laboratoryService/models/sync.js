//同步所有模型
require('./Admin');
require('./Laboratory');
require('./Order');
require('./Evaluation');
const sequelize = require('./db');
sequelize.sync({ alter: true }).then(() => {
    console.log('所有模型同步完成');
});