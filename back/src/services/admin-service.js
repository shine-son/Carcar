const bcrypt = require("bcrypt");

const userModel = require("../db/models/user-model");

class AdminService {
  async getUserByEamil(email) {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
      error.statusCode = 400;
      return error;
    }

    return user;
  }

  async getUserById(user_id) {
    const user = await userModel.findById(user_id);

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

const adminService = new AdminService();

module.exports = adminService;
