require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./config/database");
const categoryRouter = require("./modules/category/routes/categories");
const subCategoryRouter = require("./modules/category/routes/subCategories");
const ApiError = require("./config/base/models/apiError");
const globalError = require("./config/middlewares/globalError");

const app = express();

dbConnection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/categories', categoryRouter);
app.use('/api/subCategory', subCategoryRouter);
app.all('*', (req, res, next) =>
    next(new ApiError(400, `Can't find this route: ${req.originalUrl}`)));

app.use(globalError);


// Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection error ${err.name} | ${err.message}`);
});

module.exports = app;
