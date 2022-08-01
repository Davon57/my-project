const Laboratory = require("../models/Laboratory");
const { Op } = require("sequelize");
exports.addLaboratory = async function(laboratoryObj) {
    const ins = await Laboratory.create(laboratoryObj);
    return ins.toJSON();
};

exports.deleteLaboratory = async function(laboratoryId) {
    const result = await Laboratory.destroy({
        where: {
            id: laboratoryId,
        },
    });
    return result;
};

exports.updateLaboratory = async function(id, laboratoryObj) {
    const result = await Laboratory.update(laboratoryObj, {
        where: {
            id,
        },
    });
    return result;
};

exports.getLaboratoryById = async function(id) {
    const result = await Laboratory.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

exports.getLaboratorys = async function(page = 1, limit = 10, keywords = "") {
    const result = await Laboratory.findAndCountAll({
        attributes: ["id", "laboratoryId", "seat", "state"],
        where: {
            [Op.or]: [
                //里面的两个条件是或者关系
                {
                    //条件1：姓名模糊匹配关键词
                    laboratoryId: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件2：作者模糊匹配关键词
                    state: {
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