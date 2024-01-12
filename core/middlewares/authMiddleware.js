const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const ApiError = require("../base/models/apiError");
const User = require("../../modules/users/data/models/userModel");


// @desc   make sure the user is logged in
const authenticated = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  const {authorization} = req.headers;

  if (!(authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1])) {
    return next(new ApiError(401, 'You are not login, Please login to get access this route',));
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET_KEY);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError(401, 'The user that belong to this token does no longer exist',)
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(new ApiError(401, 'User recently changed his password. please login again..',));
    }
  }

  req.user = currentUser;
  next();
});

exports.authenticated = authenticated;

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.authorized = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You are not allowed to access this route'));
    }
    next();
  });
