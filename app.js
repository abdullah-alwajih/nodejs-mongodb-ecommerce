require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./config/database");
const globalError = require("./config/middlewares/globalError");
const initRoutes = require("./config/routes");

const app = express();

dbConnection();

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
