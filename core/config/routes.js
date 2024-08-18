const categoryRoute = require("../../modules/category/routes/categoriesRoute");
const subCategoryRoute = require("../../modules/category/routes/subCategoriesRoute");
const brandRoute = require("../../modules/brands/routes/brandRoute");
const productRoute = require("../../modules/product/routes/productRoute");
const userRoute = require("../../modules/users/routes/userRoute");
const addressRoute = require("../../modules/users/routes/addressRoute");
const wishlistRoute = require("../../modules/users/routes/wishlistRoute");
const reviewRoute = require("../../modules/reviews/routes/reviewRoute");
const authRoute = require("../../modules/users/routes/authRoute");
const ApiError = require("../base/models/apiError");

const initRoutes = (app) => {
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/categories', categoryRoute);
  app.use('/api/v1/subcategories', subCategoryRoute);
  app.use('/api/v1/brands', brandRoute);
  app.use('/api/v1/products', productRoute);
  app.use('/api/v1/reviews', reviewRoute);
  app.use('/api/v1/wishlist', wishlistRoute);
  app.use('/api/v1/addresses', addressRoute);
  app.get('/', (req, res) => res.status(200).send('API 4 is running successfully.'));
  app.all('*', (req, res, next) => res.status(404).send(`Can't find this route: ${req.originalUrl}`));
}

module.exports = initRoutes;
