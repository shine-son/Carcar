const { Router } = require('express');
const { userService } = require('../services/user-service');
const { loginRequired } = require('../middlewares/login-required');
const userRouter = Router();

// 회원가입(join, /api/users)
userRouter.post('/api/users/:id', async (req, res, next) => {
  try {
  /** 
   * req.body에서 data 가져오기 
   * 요청값 { email, password, fullName, phoneNumber, address } 구조할당
  */
  const { email, password, fullName, phoneNumber, address } = req.body;

  /** 위 데이터를 db에 추가하기위해 service로 보내기 */
  const newUser = await userService.addUser({
    email,
    password,
    fullName,
    phoneNumber,
    address,
  });

  /** 
   * 추가된 db 데이터를 다시 프론트로 보내줌
   * 201 Created: 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다. 이 응답은 일반적으로 POST 요청 또는 일부 PUT 요청 이후에 따라옵니다.
  */
  res.status(201).json(newUser);
  } catch(error) {
    next(error);
  }
});
  // 이메일
    // 형식 검증
    // 중복여부 검증
  
  // 비밀번호
    // minlength(11) 검증
    // 비밀번호 확인의 일치 여부 검증

  // phoneNumber

  // address



// 로그인(login)
userRouter.post('/api/login', async (req, res, next) => {
  try {
    /** request에서 요청값 받아오기 */
    const { email, password } = req.body;

    /** [스켈레톤 코드] 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내줌) */
    const userToken = await userService.getUserToken({ email, password });

    /** [스켈레톤 코드] 로그인 성공 시 jwt 토큰을 프론트에 보냄(jwt 토큰은 문자열이므로 json으로 변환필요) */
    res.status(200).json(userToken);
  } catch(error) {
    next(error);
  }
});


  // 이메일 형식 검증

  // 비밀번호 minlength(11) 검증

  // 이메일, 비밀번호 일치여부 검증 


// 관리자_전체 유저목록 조회(get)
/** 
 * [스켈레톤] 전체 유저 목록을 가져옴 (배열 형태임) 
 * [스켈레톤] 미들웨어로 loginRequired 를 썼음, (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨 )
 * 관리자가 전체 유저 목록을 보는 기능으로 보여서 admin을 path에 넣음
*/
userRouter.get('/api/admin/userlist', loginRequired, async (req, res, next) => {
  /** 전체 사용자 목록을 얻음 */
  const users = await userService.getUsers();
})

  // 비밀번호 검증

// 사용자 정보 조회(get)


// 사용자 정보 수정(update)
userRouter.put('/users/:id', loginRequired, async (req, res, next) => {
  try {

    /** [스켈레톤] params로부터 id를 가져옴 */
    const userId = req.params.id;

    /** [스켈레톤] body data 로부터 업데이트할 사용자 정보를 추출함 */
    const { password, fullName, address, phoneNumber } = req.body;

    /** [스켈레톤] body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함 */
    const currentPassword = req.body.currentPassword;

    /** [스켈레톤] currentPassword 없을 시, 진행 불가 */
    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    /** 현재 비밀번호로만 유저정보 조회 자격여부 확인 */
    const userInfoRequired = { currentPassword };

    /**
     * [스켈레톤 위 데이터가 undefined가 아니라면,
     * 즉, 프론트에서 업데잍트를 위해 보내주었다면, 업데이트용 객체를 삽입함
     */
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    /** [스켈레톤] 사용자 정보를 업데이트함. */
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    /** [스켈레톤] 업데이트 이후의 유저 데이터를 프론트에 보내 줌 */
    res.status(200).json(updatedUserInfo);
  } catch(error) {
    next(error);
  }
});

module.exports = { userRouter };

// 사용자 정보 삭제(delete)
  // 비밀번호 검증

  // 삭제 문구 입력여부 검증

