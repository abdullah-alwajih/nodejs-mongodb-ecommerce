const {body, param, check} = require("express-validator");
const slugify = require("slugify");
const Review = require("../../data/models/review");


exports.titleBrandRule = check('title').optional();

exports.ratingsBrandRule = check('ratings')
  .notEmpty()
  .withMessage('ratings value required')
  .isFloat({min: 1, max: 5})
  .withMessage('Ratings value must be between 1 to 5');


exports.userBrandRule = check('user').isMongoId().withMessage('Invalid Review id format');

exports.productBrandRule = check('product')
  .isMongoId()
  .withMessage('Invalid Review id format')
  .custom((val, {req}) =>
    // Check if logged user create review before
    Review.findOne({user: req.user._id, product: req.body.product}).then(
      (review) => {
        console.log(review);
        if (review) {
          return Promise.reject(
            new Error('You already created a review before')
          );
        }
      }
    )
  )
// exports.userBrandRule