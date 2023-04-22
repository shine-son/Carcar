const { Router } = require("express");

const asyncHandler = require("../utils/async-handler");
const orderService = require("../services/order-service");
const loginRequired = require("../middlewares/login-required");
// const { checkAdmin } = require("../middlewares/check-admin");

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
  asyncHandler(async (req, res, next) => {
    const user_id = "6440131acd26489b4a21893e";

    const order = await orderService.getOrderOfUser(user_id);

    res.json(order);
  })
);

orderRouter.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    // const user_id = "6440131acd26489b4a21893e"; // 로그인 여부만 확인하고 유저 정보는 필요없다? 아니면 더블체크를 해야한다...?
    const order_id = req.params.id;

    const order = await orderService.getOrder(order_id);

    res.json(order);
  })
);

//
orderRouter.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const order_id = req.params.id;
    const { address } = req.body;

    const order = await orderService.updateOrder(order_id, address);

    res.json(order);
  })
);

orderRouter.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const order_id = req.params.id;

    const order = await orderService.deleteOrder(order_id);

    res.json(order);
  })
);

module.exports = orderRouter;
