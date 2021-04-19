const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    res.status(200).json({ success: true, token: "d345sdf" });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};

exports.info = (req, res, next) => {
  res.send("ALl good INFO");
};
