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
    const orders = await orderService.getOrders();

    res.json(orders);
  })
);

adminRouter.put(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const order_id = req.params.id;
    const shipping_status = req.body.shippingStatus;
    const order = await orderService.changeShippingStatus(
      order_id,
      shipping_status
    );

    res.json(order);
  })
);

adminRouter.delete(
  "/orders/:id",
  loginRequired,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    const order_id = req.params.id;

    await orderService.deleteOrderByAdmin(order_id);

    res
      .status(204)
      .json({ status: "delete success", message: "delete success" });
  })
);

module.exports = adminRouter;
