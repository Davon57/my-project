const Evaluation = require("../models/Evaluation");
const { Op } = require("sequelize");

exports.addEvaluation = async function(evaluationObj) {
    const ins = await Evaluation.create(evaluationObj);
    return ins.toJSON();
};

exports.deleteEvaluation = async function(evaluationId) {
    const result = await Evaluation.destroy({
        where: {
            id: evaluationId,
        },
    });
    return result;
};

exports.getEvaluationById = async function(id) {
    const result = await Evaluation.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};
// exports.getEvaluations = async function() {
//     const result = await Evaluation.findAll();
//     return JSON.parse(JSON.stringify(result));
// };
exports.getEvaluations = async function(page = 1, limit = 10, keywords = "") {
    const result = await Evaluation.findAndCountAll({
        attributes: ["id", "loginId", "text", "evaluationTime"],
        where: {
            [Op.or]: [
                //里面的2个条件是或者关系
                {
                    //条件1：登录用户Id模糊匹配关键词
                    loginId: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件2：评论内容模糊匹配关键词
                    text: {
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