const { Router } = require("express");

const { loginRequired } = require("../middlewares/login-required");
const { asyncHandler } = require("../utils/async-handler");
const { userService } = require("../services/user-service");

const userRouter = Router();

// 회원가입 api
userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { fullName, email, password, phoneNumber, address } = req.body;

<<<<<<< HEAD
    // 위 데이터를 유저 db에 추가하기

=======
>>>>>>> 400d7346d305dcfdc0f1a151a2a1357e6e2b79c0
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

// 사용자 정보 조회
userRouter.get(
  "/info",
  loginRequired,
  asyncHandler(async (req,res,next) => {
    // loginRequired에서 찾은 id 활용
      const userId = req.currentUserId;

      // -----   보여줘야 하는 값
      const user = await userService.getUserById(userId);
    res.status(200).json(user);
    }
  )
);


// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.put(
  // [Q] REST API 작성방법에서 api에는 동사를 쓰지 않고 HTTP method로 표현한다고 배움. "/info"로 하고 put으로 수정임을 표현하면 되지 않을까?
  "/info", 
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

// 사용자 정보 삭제
userRouter.delete(
  "/info",
  // 유저임을 확인하는 작엄
  loginRequired,
  async (req, res, next) => {
    // loginRequired 미들웨어에서 찾은 id 받아와서 활용
    const userId = req.currentUserId;

    // 삭제하려면 비밀번호 입력값을 받을 것임. 이는 body값으로 올터!
    const { currentPassword } = req.body;

    // --- 비즈니스 로직은?
    // 사용자 정보 삭제
    // 확인용으로 현재 비밀번호 확인
    await userService.deleteUser(userId, currentPassword);
    // 응답값으로 쓰이질 않는데 변수 선언해줘야하는 지?

    // --- 프론트엔드에서 보여줘야하는 값
    // delete 요청이 완료되었음을 메시지로 보여줘야 할 듯!?
    res
      .status(204)
      .json({ status: "delete success", message: "delete success" });
  }
);

module.exports = { userRouter };
