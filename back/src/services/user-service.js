// services는 비즈니스 로직을 담는 곳
// 비즈니스 로직이란 정보를 받는 (controller)와 데이터베이스와 소통하는(DB) 것 외에 모든 것.
// 정보를 처리하는 곳
const userModel = require('../db/models/user-model');
/** 비밀번호 암호화하기위한 bcrypt package */
const bcrypt = require('bcrypt');

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
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해주세요."
      );
    }

    /** 중복된 이메일이 없다면 회원가입 진행 */

    /** 우선 비밀번호 해쉬화(암호화) */
    const hashedPassword = await bcrypt.hash(password, 10);
    /** 해쉬화된 비밀번호로 사용자에게 받은 비밀번호를 대체하여 저장 */
    const newUserInfo = { email, password: hashedPassword, fullName, phoneNumber, address };

    /** 암호화된 비밀번호로 저장된 newUserInfo를 db에 저장 */
    const createNewUser = await this.userModel.create(newUserInfo);

    /** addUser 메서드를 실행하면 요청값 중 비밀번호만 해쉬화해서 db에 저장 */
    return createNewUser;
  }

}

// 로그인

// 관리자