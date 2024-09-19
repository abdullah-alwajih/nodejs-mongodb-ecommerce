const {body, param} = require("express-validator");
const slugify = require("slugify");
const Category = require('../../../categories/data/models/category.model');
const SubCategory = require('../../../categories/data/models/sub-category.model');

exports.validateUpdateProduct = param('id').isMongoId().withMessage('Invalid ID formate'), body('title')
  .optional()
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });


exports.validateCreateProduct = body('title')
  .isLength({min: 3}).withMessage((value, {req}) => req.__('validation.minlength', req.__('fields.product_title')))
  .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.product_title')))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  }),

  body('description')
    .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.product_description')))
    .isLength({max: 2000}).withMessage((value, {req}) => req.__('validation.maxlength', req.__('fields.product_description'))),

  body('quantity')
    .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.product_quantity')))
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.product_quantity'))),

  body('sold')
    .optional()
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.product_sold'))),

  body('price')
    .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.product_price')))
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.product_price')))
    .isLength({max: 32}).withMessage((value, {req}) => req.__('validation.maxlength', req.__('fields.product_price'))),

  body('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.product_price_after_discount')))
    .toFloat()
    .custom((value, {req}) => {
      if (req.body.price <= value) {
        throw new Error(req.__('validation.price_after_discount_lower'));
      }
      return true;
    }),

  body('colors')
    .optional()
    .isArray().withMessage((value, {req}) => req.__('validation.array', req.__('fields.product_colors'))),

  body('imageCover')
    .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.product_image_cover'))),

  body('images')
    .optional()
    .isArray().withMessage((value, {req}) => req.__('validation.array', req.__('fields.product_images'))),

  body('category')
    .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.category')))
    .isMongoId().withMessage((value, {req}) => req.__('validation.invalid_id_format'))
    .custom((categoryId, {req}) => Category.findById(categoryId).then((category) => {
      if (!category) {
        return Promise.reject(new Error(req.__('validation.no_category_found', categoryId)));
      }
    })),

  body('subcategories')
    .optional()
    .isMongoId().withMessage((value, {req}) => req.__('validation.invalid_id_format'))
    .custom((subcategoriesIds, {req}) => SubCategory.find({
      _id: {
        $exists: true,
        $in: subcategoriesIds
      }
    }).then((result) => {
      if (result.length < 1 || result.length !== subcategoriesIds.length) {
        return Promise.reject(new Error(req.__('validation.invalid_subcategories')));
      }
    }))
    .custom((val, {req}) => SubCategory.find({category: req.body.category}).then((subcategories) => {
      const subCategoriesIdsInDB = subcategories.map(subCategory => subCategory._id.toString());
      const allSubcategoriesBelongToCategory = val.every((v) => subCategoriesIdsInDB.includes(v));
      if (!allSubcategoriesBelongToCategory) {
        return Promise.reject(new Error(req.__('validation.subcategories_not_belong_to_category')));
      }
    }))


body('brand')
  .optional()
  .isMongoId().withMessage((value, {req}) => req.__('validation.invalid_id_format')),

  body('ratingsAverage')
    .optional()
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.ratings_average')))
    .isFloat({min: 1, max: 5}).withMessage((value, {req}) => req.__('validation.rating_range')),

  body('ratingsQuantity')
    .optional()
    .isNumeric().withMessage((value, {req}) => req.__('validation.numeric', req.__('fields.ratings_quantity')));

  