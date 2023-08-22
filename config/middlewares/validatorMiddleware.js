const {validationResult} = require("express-validator");
const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else res.status(404).send({errors: result.array()});
}

module.exports = validatorMiddleware;