const categoryRouter = require("../modules/category/routes/categories");
const subCategoryRouter = require("../modules/category/routes/subCategories");
const brandsRouter = require("../modules/brands/routes/brand");
const ApiError = require("./base/models/apiError");

const initRoutes = (app) => {
  app.use('/api/categories', categoryRouter);
  app.use('/api/subcategories', subCategoryRouter);
  app.use('/api/brands', brandsRouter);

  app.all('*', (req, res, next) => next(new ApiError(400, `Can't find this route: ${req.originalUrl}`)));
}

module.exports = initRoutes;
