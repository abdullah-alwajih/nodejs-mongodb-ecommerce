const categoryRoute = require("../../modules/category/routes/categories");
const subCategoryRoute = require("../../modules/category/routes/subCategories");
const brandRoute = require("../../modules/brands/routes/brandRoute");
const productRoute = require("../../modules/product/routes/productRoute");
const userRoute = require("../../modules/users/routes/userRoute");
const ApiError = require("../base/models/apiError");

const initRoutes = (app) => {
  app.use('/api/v1/categories', categoryRoute);
  app.use('/api/v1/subcategories', subCategoryRoute);
  app.use('/api/v1/brands', brandRoute);
  app.use('/api/v1/products', productRoute);
  app.use('/api/v1/users', userRoute);

  app.all('*', (req, res, next) => next(new ApiError(400, `Can't find this route: ${req.originalUrl}`)));
}

module.exports = initRoutes;
