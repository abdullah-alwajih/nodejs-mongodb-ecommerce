const {validationResult, param} = require("express-validator");

const mongoIdRule = param('id').isMongoId().withMessage('Invalid id format');


const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else {
    const convertedResponse = result.array().reduce((acc, error) => {
      const {path, msg} = error;
      acc.errors[path] = acc.errors[path] || [];
      acc.errors[path].push(msg);
      return acc;
    }, {errors: {}});
    res.status(400).send(convertedResponse);
  }
}


module.exports = {validatorMiddleware, mongoIdRule};
