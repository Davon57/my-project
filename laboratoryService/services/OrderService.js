const Order = require("../models/Order");
const { Op } = require("sequelize");

exports.addOrder = async function(orderObj) {
    const ins = await Order.create(orderObj);
    return ins.toJSON();
};

exports.deleteOrder = async function(orderId) {
    const result = await Order.destroy({
        where: {
            id: orderId,
        },
    });
    return result;
};

exports.getOrderById = async function(id) {
    const result = await Order.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};
exports.updateOrder = async function(id, OrderObj) {
    const result = await Order.update(OrderObj, {
        where: {
            id,
        },
    });
    return result;
};

exports.getOrders = async function(page = 1, limit = 10, keywords = "") {
    const result = await Order.findAndCountAll({
        attributes: ["id", "laboratoryId", "loginId", "ipone", "check", "orderTime"],
        where: {
            [Op.or]: [
                //里面的两个条件是或者关系
                {
                    //条件1：实验室Id模糊匹配关键词
                    laboratoryId: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件2：用户名模糊匹配关键词
                    loginId: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件3：状态模糊匹配关键词
                    check: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
            ],
        },
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows)),
    };
};