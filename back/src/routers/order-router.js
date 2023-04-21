const { Router } = require("express");

const { asyncHandler } = require("../middlewares/async-handler");
const { orderService } = require("../services/order-service");

const orderRouter = Router();

orderRouter.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const user_id = "6440131acd26489b4a21893e"; // user_id를 JWT 로직을 진행시켜서 찾아오기
        const ordered = req.body; // req.body로 들어온 값 전달받기, 배열

        const order = await orderService.addOrder(ordered, user_id);

        res.json(order);
    })
);

orderRouter.get(
    "/",
    asyncHandler((req, res, next) => {
        const user_id = req.current_user;

        const order = orderService.getOrderOfUser(user_id);

        res.json(order);
    })
);

orderRouter.get(
    "/:id",
    asyncHandler((req, res, next) => {
        const user_id = req.current_user; // 로그인 여부만 확인하고 유저 정보는 필요없다? 아니면 더블체크를 해야한다...?
        const order_id = req.params.id;

        const order = orderService.getOrder(order_id);

        res.json(order);
    })
);

//
orderRouter.put(
    "/:id",
    asyncHandler((req, res, next) => {
        const order_id = req.params.id;
        const { address } = req.body;

        const order = orderService.updateOrder(order_id, address);

        res.json(order);
    })
);

orderRouter.put(
    "/:id",
    asyncHandler((req, res, next) => {})
);

module.exports = orderRouter;
