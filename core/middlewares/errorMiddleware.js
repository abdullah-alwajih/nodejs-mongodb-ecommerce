const ApiError = require("../base/models/apiError");


const errorFormat = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && {error: err, stack: err.stack})
  });
};


const handleJwtInvalidSignature = () =>
  new ApiError(401, 'Invalid token, please login again..',);

const handleJwtExpired = () =>
  new ApiError(401, 'Expired token, please login again..',);

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
  if (err.name === 'TokenExpiredError') err = handleJwtExpired();
  errorFormat(err, res);
};

module.exports = errorMiddleware;