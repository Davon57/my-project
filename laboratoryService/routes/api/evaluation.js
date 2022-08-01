const express = require("express");
const router = express.Router();
const evaServ = require("../../services/evaluationService");
const { asyncHandler } = require("../getSendResult");

router.get(
    "/",
    asyncHandler(async(req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const keywords = req.query.keywords || "";
        return await evaServ.getEvaluations(page, limit, keywords);
    })
);

router.get(
    "/:id",
    asyncHandler(async(req, res) => {
        return await evaServ.getEvaluationById(req.params.id);
    })
);

router.post(
    "/",
    asyncHandler(async(req, res, next) => {
        return await evaServ.addEvaluation(req.body);
    })
);

router.delete(
    "/:id",
    asyncHandler(async(req, res, next) => {
        return await evaServ.deleteEvaluation(req.params.id);
    })
);


module.exports = router;