// services는 비즈니스 로직을 담는 곳
// 비즈니스 로직이란 정보를 받는 (controller)와 데이터베이스와 소통하는(DB) 것 외에 모든 것.
// 정보를 처리하는 곳
const userModel = require('../db/models/user-model');

class UserService {
  /** 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됌 */
  constructor(userModel) {
    this.userModel = userModel;
  }

// 회원가입
async addUser(userInfo) {
  /** 회원가입시 받는 사용자 정보 */
  const { email, password, fullName, phoneNumber, address } = userInfo;

  /** 이메일 중복 확인 */


}

}

// 로그인

// 관리자