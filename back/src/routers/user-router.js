const { Router } = require("express");

const loginRequired = require("../middlewares/login-required");
const asyncHandler = require("../utils/async-handler");
const userService = require("../services/user-service");

const userRouter = Router();

// 회원가입 api
userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phoneNumber, address } = req.body;

    const newUser = await userService.addUser({
      fullName,
      email,
      password,
      phoneNumber,
      address,
    });

    res.status(201).json(newUser);
  })
);

// 로그인 api
userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    res.status(200).json(userToken);
  })
);

// 유저 정보 수정
userRouter.put(
  "/edit",
  loginRequired,
  asyncHandler(async function (req, res, next) {
    const userId = req.currentUserId;
    const { fullName, password, address, phoneNumber, role } = req.body;
    const currentPassword = req.body.currentPassword;

    if (!currentPassword) {
      const err = new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      err.status = 403;

      throw err;
    }

    const userInfoRequired = { userId, currentPassword };

    // 각각의 데이터가 undefined이라면?
    const toUpdate = {
      ...(fullName && { full_name: fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phone_number: phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedUserInfo);
  })
);

module.exports = userRouter;
