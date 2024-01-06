const errorFormat = err => process.env.NODE_ENV === "development" ?
  {message: err.message, stack: err.stack} :
  {message: err.message,};

const errorMiddleware = (err, req, res, next) => res.status(err.status || 406).json(errorFormat(err));

module.exports = errorMiddleware;