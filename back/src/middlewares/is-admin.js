const isAdmin = async (req, res, next) => {
  // 로그인한 user_id의 정보를 받아온다.
  try {
    const role = req.currentRole;

    if (role !== "admin") {
      const err = new Error(403, "권한이 없습니다.");
      throw err;
    }

    next();
  } catch (err) {
    next(err);
  }

  return;
};

module.exports = { isAdmin };
