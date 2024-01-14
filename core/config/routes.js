const categoryRoute = require("../../modules/category/routes/categoriesRoute");
const subCategoryRoute = require("../../modules/category/routes/subCategoriesRoute");
const brandRoute = require("../../modules/brands/routes/brandRoute");
const productRoute = require("../../modules/product/routes/productRoute");
const userRoute = require("../../modules/users/routes/userRoute");
const authRoute = require("../../modules/users/routes/authRoute");
const ApiError = require("../base/models/apiError");

const initRoutes = (app) => {
  app.use('/api/v1/auth', authRoute);

  app.use('/api/v1/categories', categoryRoute);
  app.use('/api/v1/subcategories', subCategoryRoute);
  app.use('/api/v1/brands', brandRoute);
  app.use('/api/v1/products', productRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/', categoryRoute);
  app.all('*', (req, res, next) => next(new ApiError(400, `Can't find this route: ${req.originalUrl}`)));
}

module.exports = initRoutes;
