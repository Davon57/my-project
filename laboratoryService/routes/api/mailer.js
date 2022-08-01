const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../getSendResult");
const emailServ = require("../emailSerice");


router.post(
    "/",
    asyncHandler(async(req, res, next) => {
        return await emailServ.sendEmail(req.body.email);
        res.setHeader('Access-Control-Expose-Headers', 'authorization');
    })
);

module.exports = router;