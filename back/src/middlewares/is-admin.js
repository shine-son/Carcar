const userService = require("../services/user-service");
const asyncHandler = require("../utils/async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  // 로그인한 user_id의 정보를 받아온다.
  const userId = req.currentUserId;

  // user_id를 가지고 user를 찾고 user의 role을 확인해 admin인지 확인한다.
  const user = await userService.getUserById(userId);

  const role = user.role;

  if (role !== "admin") {
    throw new Error("권한이 없습니다.");
  }

  next();

  return;
});

module.exports = isAdmin;

// const bcrypt = require("bcrypt");

// const userModel = require("../db/models/user-model");
// const userService = require('../services/user-service');

// class AdminService {
//   async getUser(email) {
//     const user = await userModel.getUserByEmail(email);

//     if (!user) {
//       const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
//       error.statusCode = 400;
//       return error;
//     }

//     return user;
//   }

//   async validPassword(user, password) {
//     const isValidUser = await bcrypt.compare(password, user.password);

//     if (!isValidUser) {
//       const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
//       error.statusCode = 400;
//       return error;
//     }

//     return;
//   }
// }

// const adminService = new AdminService();

// module.exports = adminService;
