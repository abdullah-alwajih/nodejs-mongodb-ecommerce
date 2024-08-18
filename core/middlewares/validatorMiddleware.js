const {validationResult, param} = require("express-validator");

const mongoIdRule = param('id').isMongoId().withMessage('Invalid id format');


const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorDetails = errors.array().reduce((acc, error) => {
    const {path, msg} = error;
    acc[path] = acc[path] || [];
    acc[path].push(msg);
    return acc;
  }, {});

  return res.status(400).json({
    message: req.__('error.bad_request'),
    errors: errorDetails,
  });
};


module.exports = {validatorMiddleware, mongoIdRule};
