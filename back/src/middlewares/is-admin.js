const userService = require("../services/user-service");

const isAdmin = async (req, res, next) => {
  // 로그인한 user_id의 정보를 받아온다.

  try {
    const userId = req.currentUserId;

    // user_id를 가지고 user를 찾고 user의 role을 확인해 admin인지 확인한다.
    const user = await userService.getUserById(userId);

    const role = user.role;

    if (role !== "admin") {
      const err = new Error("권한이 없습니다.");
      err.status = 403;
      throw error;
    }

    next();
  } catch (err) {
    next(err);
  }

  return;
};

module.exports = isAdmin;
