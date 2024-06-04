const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../data/models/userModel');
const ApiError = require("../../../../core/base/models/apiError");
const createToken = require("../../../../core/utils/token");
const sendEmail = require("../../../../core/utils/mail");

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({data: user, token});
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({email: req.body.email});

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError(401, __('Incorrect email or password')));
  }
  // 3) generate token
  const token = createToken(user._id);

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({data: user, token});
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return next(new ApiError(404, `There is no user with that email ${req.body.email}`,));
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  // 3) Send the reset code via email
  const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)', message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError(500, 'There is an error in sending email',));
  }

  res
    .status(200)
    .json({status: 'Success', message: 'Reset code sent to email'});
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode, passwordResetExpires: {$gt: Date.now()},
  });
  if (!user) {
    return next(new ApiError(404, 'Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({status: 'Success',});
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return next(new ApiError(404, `There is no user with email ${req.body.email}`,));
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError(400, 'Reset code not verified',));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({token});
});
