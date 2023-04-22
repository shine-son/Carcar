const userModel = require("../db/models/user-model");
/** 비밀번호 암호화하기위한 bcrypt package */
const bcrypt = require("bcrypt");

class UserService {
  /**
   * [스켈레톤] 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됌
   * class에 대한 이해가 부족해서 우선 코드 작성 후 class 공부해서 리팩토링 해보겠습니다.
   */
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
    const newUserInfo = {
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      address,
    };

    /** 암호화된 비밀번호로 저장된 newUserInfo를 db에 저장 */
    const createNewUser = await this.userModel.create(newUserInfo);

    /** addUser 메서드를 실행하면 요청값 중 비밀번호만 해쉬화해서 db에 저장 */
    return createNewUser;
  }

  // 로그인
  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;

    /** 우선 해당 이메일의 사용자 정보가 db에 있는지 확인 */
    const user = await this.userModel.findByEmail(email);
    /** 사용자 정보가 db에 없다면 */
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    /** 이메일은 확인되었으므로 비밀번호 확인차례 */

    /** db에 해쉬화된 비밀번호 */
    const correctHashedPassword = user.password;
    /** 입력된 비밀번호와 db에 저장된 암호화된 비밀번호 비교 */
    const isPasswordCorrect = bcrypt.compare(password, correctHashedPassword);

    /** 비밀번호가 일치하지 않으면 */
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    /**
     * 스켈레톤 코드를 따왔지만 이해가 안 되어서 jwt 토큰을 공부후 다시 확인하겠습니다.
     * [스켈레톤 코드]로그인 성공 -> JWT 웹 토큰 생성
     */
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    /** [스켈레톤] 2개의 프로퍼티를 jwt 토큰에 담음 */
    const token = jwt.token({ userId: user._id, role: user.role }, secretKey);

    /** 왜 중괄호로 감싸서 리턴하는가? */
    return { token };
  }

  // 관리자
  /** 사용자 목록을 받음 */
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    const { currentPassword } = userInfoRequired;

    /**
     * [스켈레톤] 우선 해당 id의 유저가 db에 있는지 확인
     */
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    /**
     * 유저가 있다면, 정보 수정을 위해 사용자가 입력한 현재 비밀번호가 올바른 값인지 확인해야 함.
     * 비밀번호 일치 여부 확인
     */
    const correctHashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctHashedPassword
    );

    /** 입력한 비밀번호가 db내의 비밀번호와 일치하지 않는다면 */
    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    /**
     * 비밀번호가 일치하다면 업데이트 작업 시작
     * 수정페이지에서 입력된 비밀번호
     */
    const { password } = toUpdate;

    /** 입력된 비밀번호를 암호화 */
    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    /**
     * 업데이트 진행
     * 인자로 userModel의 값들을 다 적어야 하는지? (email, role은 수정안하는데 적어줘야 하는지?)
     */
    user = await this.userModel.update({
      userId,
      // email,
      update: toUpdate,
      // role,
    });

    return user;
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
