const { Router } = require('express');


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


// 사용자 정보 조회(get)
  // 비밀번호 검증


// 사용자 정보 수정(update)
  // ??


// 사용자 정보 삭제(delete)
  // 비밀번호 검증

  // 삭제 문구 입력여부 검증

