const { userModel } = require("../db/models/user-model");

const { bcrypt } = require("bcrypt");
const { jwt } = require("jsonwebtoken");

/**
 * user의 비지니스 로직을 담당
 */
class UserService {

  // 회원가입
  async addUser(userInfo) {
    const { email, fullName, password, phoneNumber, address } = userInfo;

    // 이메일 중복 확인
    const user = await userModel.findByEmail(email);
    if (user) {
      const err = new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
      err.status = 403;

      throw err;
    }

    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 전달받은 값을 가지고 새로운 user 정보를 생성
    const newUserInfo = {
      full_name: fullName,
      email,
      password: hashedPassword,
      phone_number: phoneNumber,
      address: {
        postal_code: address.postalCode,
        address_main: address.addressMain,
        address_detail: address.addressDetail,
      },
    };

    // db에 저장
    const createdNewUser = await userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 로그인
  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
    const user = await userModel.findByEmail(email);
    if (!user) {
      const err = new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
      err.status = 404;

      throw err;
    }

    // 비밀번호 일치 여부 확인

    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있던 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const err = new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
      err.status = 401;

      throw err;
    }

    // 로그인 성공 -> JWT 웹 토큰 생성, 테스트용으로 "secret-key"를 넣어놓음(env파일 작성 안해놓아서)
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    // user_id, role을 jwt 토큰에 담음
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    return { token };
  }

  // 사용자 목록을 받음.
  async getUsers() {
    const users = await userModel.findAll();

    return users;
  }

  // userId로 사용자를 찾음.
  async getUserById(userId) {
    const user = await userModel.findById(userId);

    return user;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const err = new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
      err.status = 404;

      throw err;
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      const err = new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
      err.status = 401;

      throw err;
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 유저정보 삭제, 현재 비밀번호가 있어야 탈퇴 가능함.
  async deleteUser(userId, currentPassword) {
    // 아이디까지 받지 않고 현재 비밀번호 값으로만 진행해보려 함
    const user = await userModel.findById(userId);

    if (!user) {
      const err = new Error(
        "해당 유저는 존재하지 않습니다. 다시 한 번 확인해 주세요."
      );
      err.status = 404;

      throw err;
    }

    // 비밀번호 일치 여부 확인
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      const err = new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
      err.status = 401;

      throw err;
    }

    // user-model로 옮길 예정입니다.
    await userModel.findOneAndDelete(user.password);

    return;
}

const userService = new UserService(userModel);

module.exports = { userService };
