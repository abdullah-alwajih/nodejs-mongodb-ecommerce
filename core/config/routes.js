const categoryRoute = require("../../modules/categories/routes/category.route");
const subCategoryRoute = require("../../modules/categories/routes/sub-category.route");
const brandRoute = require("../../modules/brands/routes/brand.route");
const productRoute = require("../../modules/products/routes/product.route");
const userRoute = require("../../modules/users/routes/user.route");
const addressRoute = require("../../modules/users/routes/address.route");
const wishlistRoute = require("../../modules/users/routes/wishlist.route");
const reviewRoute = require("../../modules/reviews/routes/review.route");
const authRoute = require("../../modules/users/routes/auth.route");

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
  app.get('/', (req, res) => res.status(200).send('API 5 is running successfully.'));
  app.all('*', (req, res, next) => res.status(404).send(`Can't find this route: ${req.originalUrl}`));
}

module.exports = initRoutes;
