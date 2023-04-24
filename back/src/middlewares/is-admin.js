const userService = require("../services/user-service");

const isAdmin = async (req, res, next) => {
  // 로그인한 user_id의 정보를 받아온다.
  try {
    const userId = req.currentUserId;

    const role = req.currentRole;

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
