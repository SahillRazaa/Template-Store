const { Users } = require("../../models");
const { hashPassword, decryptPassword } = require("../services/password");
const asyncHandler = require("../utils/asyncHandler");
const { sendTokenCookie } = require("../utils/token");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: "Please provide all details!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match!" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters!" });
  }

  const userExists = await Users.findOne({ where: { email } });

  if (userExists) {
    return res.status(409).json({ success: false, message: "User already exists!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  sendTokenCookie(res, newUser.id);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide email and password!" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters!" });
  }

  const user = await Users.scope("withPassword").findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials!" });
  }

  const isMatch = await decryptPassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials!" });
  }

  sendTokenCookie(res, user.id);

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ success: true, message: "Logged out successfully" });
});

const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
