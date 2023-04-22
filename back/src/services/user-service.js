const bcrypt = require("bcrypt");

const { userModel } = require("../db/models/user-model");

class UserService {
  async getUser(email) {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
      error.statusCode = 400;
      return error;
    }

    return user;
  }

  async validPassword(user, password) {
    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
      error.statusCode = 400;
      return error;
    }

    return;
  }
}

const userService = new UserService();

module.exports = { userService };
