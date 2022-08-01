const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const cryptor = require("../util/crypt");
//需要认证的api,
const needTokenApi = [
    { method: "get", path: "/api/admin/" },
    { method: "put", path: "/api/admin/:id" },
    { method: "get", path: "/api/admin/whoami" },
    { method: "delete", path: "/api/admin/:id" },
    { method: "get", path: "/api/evaluation/" },
    { method: "delete", path: "/api/evaluation/:id" },
    { method: "get", path: "/api/evaluation/:id" },
    { method: "post", path: "/api/evaluation/" },
    { method: "get", path: "/api/laboratory/" },
    { method: "post", path: "/api/laboratory/" },
    { method: "get", path: "/api/laboratory/:id" },
    { method: "delete", path: "/api/laboratory/:id" },
    { method: "put", path: "/api/laboratory/:id" },
    { method: "get", path: "/api/order/" },
    { method: "get", path: "/api/order/:id" },
    { method: "post", path: "/api/order/" },
    { method: "delete", path: "/api/order/:id" },
];

// 用于解析token
module.exports = (req, res, next) => {
    // /api/admin/:id 和  /api/admin/1771
    //path-to-regexp 这个库会把路径规则转化成正则表达式，从而进行匹配。
    const apis = needTokenApi.filter((api) => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0) {
        next();
        return;
    }

    let token = req.cookies.token;
    if (!token) {
        // 从header的authorization中获取
        token = req.headers.authorization;
    }
    if (!token) {
        //没有认证
        handleNonToken(req, res, next);
        return;
    }
    const userId = cryptor.decrypt(token);
    req.userId = userId;
    next();
};

//处理没有认证的情况
function handleNonToken(req, res, next) {
    res
        .status(403)
        .send(getErr("you dont have any token to access the api", 403));
}