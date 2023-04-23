const adminService = require("../services/admin-service");

const isAdmin = async (req, res, next) => {
  try {
    // 로그인한 user_id의 정보를 받아온다.
    const user_id = req.currentUserId;

    // user_id를 가지고 user를 찾고 user의 role을 확인해 admin인지 확인한다.
    const user = await adminService.getUserById(user_id);

    const role = user.role;

    if (role !== "admin") {
      throw new Error("권한이 없습니다.");
    }

    next();
  } catch (err) {
    next(err);
  }

  return;
};

module.exports = isAdmin;
