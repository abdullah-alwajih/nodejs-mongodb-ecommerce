const cors = require('cors')
const ApiError = require("../base/models/apiError");

const initCROSOrigins = (app) => {
  const whitelist = ['http://example1.com', 'http://example2.com']
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        new ApiError(401, 'Not allowed by CORS')
      }
    }
  }
  app.use(cors(corsOptions));
}

module.exports = initCROSOrigins;