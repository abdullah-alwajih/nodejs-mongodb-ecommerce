require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require("./core/config/database");
const globalError = require("./core/middlewares/errorMiddleware");
const initRoutes = require("./core/config/routes");
const initCROSOrigins = require("./core/config/cors_origins");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const authRoute = require("./modules/users/routes/authRoute");
const hpp = require("hpp");

const app = express();
app.use(express.static(path.join(__dirname, 'uploads')));

dbConnection();

initCROSOrigins(app)
app.use(logger('dev'));
app.use(express.json({
  limit: "1mb",
}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// compress all responses
app.use(compression())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  handler: (req, res, /*next*/) => {
    res.status(429).json({
      message: "Too many requests, please try again later."
    });
  },
})

// Apply the rate limiting middleware to all requests.
app.use('/api', limiter);

// app.use(bodyParser.urlencoded()); // Make sure the body is parsed beforehand.
app.use(hpp({whitelist: ['filter']})); // <- THIS IS THE NEW LINE
initRoutes(app);


app.use(globalError);


// Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection error ${err.name} | ${err.message}`);
});

module.exports = app;
