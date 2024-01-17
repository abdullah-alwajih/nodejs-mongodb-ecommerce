require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./core/config/database");
const globalError = require("./core/middlewares/errorMiddleware");
const initRoutes = require("./core/config/routes");

const index = express();
index.use(express.static(path.join(__dirname, 'uploads')));

dbConnection();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));

initRoutes(index);


index.use(globalError);


// Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection error ${err.name} | ${err.message}`);
});

module.exports = index;
