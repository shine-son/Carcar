const { Router } = require("express");

const { asyncHandler } = require("../utils/async-handler");

const { adminService } = require("../services/admin-service");

const adminRouter = Router();

adminRouter.get("/order");

module.exports = adminRouter;
