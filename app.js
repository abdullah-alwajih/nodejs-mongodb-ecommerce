require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./core/config/database");
const globalError = require("./core/middlewares/errorMiddleware");
const initRoutes = require("./core/config/routes");
const initCROSOrigins = require("./core/config/cors_origins");

const app = express();
app.use(express.static(path.join(__dirname, 'uploads')));

dbConnection();

initCROSOrigins(app)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initRoutes(app);


app.use(globalError);


// Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection error ${err.name} | ${err.message}`);
});

module.exports = app;
