const { Router } = require("express");

const loginRequired = require("../middlewares/login-required");
const isAdmin = require("../middlewares/is-admin");
const asyncHandler = require("../utils/async-handler");
const orderService = require("../services/order-service");

const adminRouter = Router();

adminRouter.get(
  "/orders",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const orders = await orderService.getOrdersOfAdmin();

    res.status(200).json(orders);
  })
);

adminRouter.put(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;
    const shippingStatus = req.body.shippingStatus;
    const order = await orderService.changeShippingStatus(
      orderId,
      shippingStatus
    );

    res.status(200).json(order);
  })
);

adminRouter.delete(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const orderId = req.params.id;

    await orderService.deleteOrderByAdmin(orderId);

    res
      .status(204)
      .json({ status: "delete success", message: "delete success" });
  })
);

module.exports = adminRouter;
