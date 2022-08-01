// 管理员初始化
// 判断数据库中是否有管理员，如果没有，自动添加一个默认管理员
const Admin = require("../models/Admin");
const { Op } = require("sequelize");
exports.addAdmin = async function(adminObj) {
    // 应该判断adminObj的各种属性是否合理，以及账号是否已存在
    const loginId = adminObj.loginId;
    const result = await Admin.findOne({
        where: {
            loginId
        },
    });
    if (result && result.loginId === adminObj.loginId) {
        return null;
    } else if (adminObj.role === '2') {
        const ins = await Admin.create(adminObj);
        return ins.toJSON();
    } else {
        return null;
    }
};

exports.deleteAdmin = async function(loginId) {
    const result = await Admin.destroy({
        where: {
            id: loginId,
        },
    });
    return result;
};

exports.updateAdmin = async function(id, adminObj) {
    const result = await Admin.update(adminObj, {
        where: {
            id,
        },
    });
    return result;
};

exports.login = async function(loginId, loginPwd) {
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
    });
    const superAdmin = {
        loginId: "admin",
        loginPwd: "123456",
        role: "0"
    }
    const superUser = await Admin.findAll();
    if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
        return result.toJSON();
    } else if (!superUser.length) {
        const ins = await Admin.create(superAdmin);
        return ins.toJSON();
    }
    return null;
};


exports.getAdminById = async function(id) {
    const result = await Admin.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

exports.getAdmins = async function(page = 1, limit = 10, keywords = "") {
    const result = await Admin.findAndCountAll({
        attributes: ["id", "loginId", "loginPwd", "role"],
        where: {
            [Op.or]: [
                //里面的三个条件是或者关系
                {
                    //条件1：用户名模糊匹配关键词
                    loginId: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件2：密码模糊匹配关键词
                    loginPwd: {
                        [Op.like]: `%${keywords}%`,
                    },
                },
                {
                    //条件3：id模糊匹配关键词
                    role: {
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