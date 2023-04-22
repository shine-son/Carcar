const { Router } = require("express");

const asyncHandler = require("../utils/async-handler");
const orderService = require("../services/order-service");
const loginRequired = require("../middlewares/login-required");
// const { isAdmin } = require("../middlewares/check-admin");

const orderRouter = Router();

orderRouter.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const user_id = req.currentUserId; // user_id를 JWT 로직을 진행시켜서 찾아오기
    const ordered = req.body; // req.body로 들어온 값 전달받기, 배열

    const order = await orderService.addOrder(ordered, user_id);

    res.json(order);
  })
);

orderRouter.get(
  "/",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const user_id = req.currentUserId;

    const order = await orderService.getOrderOfUser(user_id);

    res.json(order);
  })
);

orderRouter.get(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const order_id = req.params.id;

    const order = await orderService.getOrder(order_id);

    res.json(order);
  })
);

//
orderRouter.put(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const user_id = req.currentUserId;
    const order_id = req.params.id;
    const address = req.body.address;
    console.log(address);

    const order = await orderService.updateOrder(user_id, order_id, address);

    res.json(order);
  })
);

orderRouter.delete(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const user_id = req.currentUserId;
    const order_id = req.params.id;

    const order = await orderService.deleteOrder(user_id, order_id);

    res
      .status(204)
      .json({ status: "delete success", message: "delete success" });
  })
);

module.exports = orderRouter;
