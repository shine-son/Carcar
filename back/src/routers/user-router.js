const { Router } = require("express");

// 정상적으로 로그인한 유저인지 확인하는 미들웨어
const { loginRequired } = require("../middlewares/login-required");
// 에러를 처리하는 try-catch문 역할을 수행하는 미들웨어
const { asyncHandler } = require("../utils/async-handler");
// 비지니스 로직은 userService에서 진행
const { userService } = require("../services/user-service");

const { userRouter } = Router();

// 회원가입 api
userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    // req(request)의 body 에서 데이터 가져오기(<- POST, PUT)
    // 구조 분해 할당으로 req.body에 해당하는 값들을 가져와 변수에 할당한다.
    const { email, password, fullName, phoneNumber, address } = req.body;

    // 위 데이터를 유저 db에 추가하기
    /** 신규사용자 정보 */
    const newUser = await userService.addUser({
      email,
      password,
      fullName,
      phoneNumber,
      address,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newUser);
  })
);

// 로그인 api
userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  })
);

// 사용자 정보 조회
userRouter.get(
  "/info",
  loginRequired,
  asyncHandler(async (req,res,next) => {
    /** jwt 토큰으로 검증된 id(from loginRequired) */
    const userId = req.currentUserId;

    const user = await userService.getUserById(userId);
    res.status(200).json(user);
    }
  )
);


// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.put(
  "/info", 
  loginRequired,
  asyncHandler(async function (req, res, next) {
    /** loginRequired 미들웨어에서 저장된 currentUserId 사용(jwt토큰으로 검증된 id) */
    const userId = req.currentUserId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { fullName, password, address, phoneNumber } = req.body;

    // 수정 페이지로 들어가기전에 password를 확인하는 방법을 고민??
    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함. currentPassword라는 속성이 있나?
    // const currentPassword = req.body.currentPassword;
    // db에 있는 password가 현재 비밀번호이지 않나??
    const currentPassword = req.body.password;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      const err = new Error(403, "정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      throw err;
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    // role은 사용자가 변경하면 안 되므로 뺐습니다.
    const toUpdate = {
      ...(fullName && { full_name: fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phone_number: phoneNumber }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  })
);

// 사용자 정보 삭제
userRouter.delete(
  "/info",
  loginRequired,
  async (req, res, next) => {
    /** loginRequired 미들웨어에서 저장된 currentUserId 사용(jwt토큰으로 검증된 id) */
    const userId = req.currentUserId;

    // 삭제하려면 비밀번호 입력값을 받을 것임. 이는 body값으로 올터!
    const { currentPassword } = req.body;

    await userService.deleteUser(userId, currentPassword);

    res
      .status(204)
      .json({ message: "delete success" });
  }
);

module.exports = { userRouter };
