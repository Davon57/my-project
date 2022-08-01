const express = require("express");
const router = express.Router();
const labServ = require("../../services/laboratoryService");
const { asyncHandler } = require("../getSendResult");

router.get(
    "/",
    asyncHandler(async(req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const keywords = req.query.keywords || "";
        return await labServ.getLaboratorys(page, limit, keywords);
    })
);

router.get(
    "/:id",
    asyncHandler(async(req, res) => {
        return await labServ.getLaboratoryById(req.params.id);
    })
);

router.post(
    "/",
    asyncHandler(async(req, res, next) => {
        return await labServ.addLaboratory(req.body);
    })
);

router.delete(
    "/:id",
    asyncHandler(async(req, res, next) => {
        return await labServ.deleteLaboratory(req.params.id);
    })
);

router.put(
    "/:id",
    asyncHandler(async(req, res, next) => {
        return await labServ.updateLaboratory(req.params.id, req.body);
    })
);

module.exports = router;