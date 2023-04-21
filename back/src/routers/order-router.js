const { Router } = require("express");

const { asyncHandler } = require("../middlewares/async-handler");
const { orderService } = require("../services/order-service");

const orderRouter = Router();

orderRouter.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const user_id = req.currentUserId; // user_id를 JWT 로직을 진행시켜서 찾아오기
    const ordered = req.body; // req.body로 들어온 값 전달받기, 배열

    const order = await orderService.addOrder(ordered, user_id);

    res.json(order);
  })
);

module.exports = orderRouter;
