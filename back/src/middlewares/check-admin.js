const User = require("../db/schemas/user-schema");

const checkAdmin = (req, res, next) => {
  const user_id = req.currentUserId;

  const isAdmin = User.findOne(user_id);
};

module.exports = checkAdmin;
