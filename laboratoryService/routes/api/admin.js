const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("../getSendResult");
const cryptor = require("../../util/crypt");

router.post(
    "/login",
    asyncHandler(async(req, res) => {
        const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
        if (result) {
            let value = result.id;
            value = cryptor.encrypt(value.toString());
            //登录成功
            res.cookie("token", value, {
                path: "/",
                domain: "localhost",
                maxAge: 7 * 24 * 3600 * 1000, //毫秒数
            });
            res.setHeader('Access-Control-Expose-Headers', 'authorization');
            res.header("authorization", value);
        }
        return result;
    })
);


router.get("/whoami", asyncHandler(async(req, res) => {
    res.setHeader('Access-Control-Expose-Headers', 'authorization');
    return await adminServ.getAdminById(req.userId)
}))

router.post(
    '/register',
    asyncHandler(async(req, res, next) => {
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
        return await adminServ.addAdmin(req.body)
    }));

router.delete(
    "/:id",
    asyncHandler(async(req, res, next) => {
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
        return await adminServ.deleteAdmin(req.params.id);
    })
);

router.put(
    "/:id",
    asyncHandler(async(req, res, next) => {
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
        return await adminServ.updateAdmin(req.params.id, req.body);
    })
);
router.get(
    "/",
    asyncHandler(async(req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const keywords = req.query.keywords || "";
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
        return await adminServ.getAdmins(page, limit, keywords);
    })
);
module.exports = router;