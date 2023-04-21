// 프로젝트 백엔드 코치님 강의
// router(=controller)는 정보를 받는 곳 = request에 대한 검증을 하는 곳
// request의 무엇을 검증해야 하는가??

// 엘리스 강의자료
// 라우팅 = HTTP 요청에 따라 알맞은 응답을 보내주는 경로를 설정해주는 일
// 검증과는 다른 것이지 않나??


const { Router } = require('express');


const userRouter = Router();

// 회원가입(join)
  // 이메일
    // 형식 검증
    // 중복여부 검증
  
  // 비밀번호
    // minlength(11) 검증
    // 비밀번호 확인의 일치 여부 검증

  // phoneNumber

  // address



// 로그인(login)
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

