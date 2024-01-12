require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./core/config/database");
const globalError = require("./core/middlewares/errorMiddleware");
const initRoutes = require("./core/config/routes");

const app = express();
app.use(express.static(path.join(__dirname, 'uploads')));

dbConnection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initRoutes(app);


app.use(globalError);


// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});


module.exports = app;
