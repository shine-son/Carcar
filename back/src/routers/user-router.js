const { Router } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { asyncHandler } = require("../utils/async-handler");
const { userService } = require("../services/user-service");
const { User } = require("../db/schemas/user-schema");

const userRouter = Router();

userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { email, password, fullName, phoneNumber, address, role } = req.body;

    const hassed_password = await bcrypt.hash(password);

    const newUser = await User.create({
      email,
      password: hassed_password,
      fullName,
      phoneNumber,
      address,
      role,
    });

    return newUser;
  })
);

userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.getUser(email);

    await userService.validPassword(user, password);

    const token = jsonwebtoken.sign(
      {
        em: user.email,
        pe: user.permission,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ error: null, data: token });
  })
);

module.exports = userRouter;
