const {body, param} = require("express-validator");
const slugify = require("slugify");
const Category = require('../../../categories/data/models/category.model');
const SubCategory = require('../../../categories/data/models/sub-category.model');

exports.validateUpdateProduct = param('id').isMongoId().withMessage('Invalid ID formate'),
  body('title')
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    });


exports.validateCreateProduct = body('title')
  .isLength({min: 3}).withMessage('must be at least 3 chars')
  .notEmpty().withMessage('Product required')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  }),

  body('description')
    .notEmpty().withMessage('Product description is required')
    .isLength({max: 2000}).withMessage('Too long description'),

  body('quantity')
    .notEmpty().withMessage('Product quantity is required')
    .isNumeric().withMessage('Product quantity must be a number'),

  body('sold')
    .optional()
    .isNumeric().withMessage('Product quantity must be a number'),

  body('price')
    .notEmpty().withMessage('Product price is required')
    .isNumeric().withMessage('Product price must be a number')
    .isLength({max: 32}).withMessage('To long price'),

  body('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, {req}) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),

  body('colors')
    .optional()
    .isArray().withMessage('availableColors should be array of string'),

  body('imageCover').notEmpty().withMessage('Product imageCover is required'),

  body('images')
    .optional()
    .isArray().withMessage('images should be array of string'),

  body('category')
    .notEmpty().withMessage('Product must be belong to a categories')
    .isMongoId().withMessage('Invalid ID formate')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  body('subcategories')
    .optional()
    .isMongoId().withMessage('Invalid ID formate')
    .custom((subcategoriesIds) =>
      SubCategory.find({_id: {$exists: true, $in: subcategoriesIds}}).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subcategories Ids`));
          }
        }
      )
    )
    .custom((val, {req}) =>
      SubCategory.find({category: req.body.category}).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(new Error(`subcategories not belong to category`));
          }
        }
      )
    ),
  body('brand').optional().isMongoId().withMessage('Invalid ID formate'),
  body('ratingsAverage')
    .optional()
    .isNumeric().withMessage('ratingsAverage must be a number')
    .isLength({min: 1}).withMessage('Rating must be above or equal 1.0')
    .isLength({max: 5}).withMessage('Rating must be below or equal 5.0'),
  body('ratingsQuantity')
    .optional()
    .isNumeric().withMessage('ratingsQuantity must be a number');

  