const express = require("express");
const router = express.Router();
const ordServ = require("../../services/OrderService");
const labServ = require("../../services/LaboratoryService");
const { asyncHandler } = require("../getSendResult");

router.get(
    "/",
    asyncHandler(async(req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const keywords = req.query.keywords || "";
        return await ordServ.getOrders(page, limit, keywords);
    })
);

router.get(
    "/:id",
    asyncHandler(async(req, res) => {
        return await ordServ.getOrderById(req.params.id);
    })
);

router.post(
    "/",
    asyncHandler(async(req, res, next) => {
        return await ordServ.addOrder(req.body);
    })
);

router.delete(
    "/:id",
    asyncHandler(async(req, res, next) => {
        return await ordServ.deleteOrder(req.params.id);
    })
);
router.put(
    "/:id",
    asyncHandler(async(req, res, next) => {
        return await ordServ.updateOrder(req.params.id, req.body).then((res) => {
            if (req.body.check === '通过审核') {
                // 获取当前北京时间时间戳
                const time = new Date().getTime();
                // 获取开始时间和结束时间时间戳
                // 对当前时间进行格式化
                function formatDate(time) {
                    const date = new Date();
                    const year = date.getFullYear();
                    const timeArr = time.split(' ');
                    const timeArr1 = timeArr[0].split('-');
                    const timeArr2 = timeArr[1].split('-');
                    if (timeArr1[0].length === 1) {
                        timeArr1[0] = '0' + timeArr1[0];
                    }
                    const end = year + '-' + timeArr1[0] + '-' + timeArr1[1] + ' ' + timeArr2[1] + ':00';
                    const start = year + '-' + timeArr1[0] + '-' + timeArr1[1] + ' ' + timeArr2[0] + ':00';
                    const timeAll = { start, end };
                    return timeAll;
                }
                // 开始时间转化为时间戳
                const time1 = formatDate(req.body.orderTime).start;
                const startTime = new Date(time1).getTime();
                // 结束时间转化为时间戳
                const time2 = formatDate(req.body.orderTime).end;
                const endTime = new Date(time2).getTime();

                // 审批后开始倒计时
                const checkTime = startTime - time;
                if (checkTime > 0) {
                    setTimeout(() => {
                        // 存储当前实验室的id
                        const labId = {};
                        // 获取当前实验室更改信息
                        const labInfo = {};
                        labServ.getLaboratorys(1, 1, req.body.laboratoryId).then((resp) => {
                            labId.id = resp.datas[0].id;
                            labInfo.laboratoryId = resp.datas[0].laboratoryId;
                            labInfo.seat = resp.datas[0].seat;
                            labInfo.state = '正忙碌';
                            labServ.updateLaboratory(labId.id, labInfo);
                        });
                        const time3 = new Date().getTime();
                        const checkTime1 = endTime - time3;
                        if (checkTime1 > 0) {
                            setTimeout(() => {
                                labInfo.state = '空闲';
                                labServ.updateLaboratory(labId.id, labInfo);
                            }, checkTime1);
                        }
                    }, checkTime);

                }
            }
        });
    })
);


module.exports = router;