
const errorFormat = err => process.env.NODE_ENV === "development" ?
    { message: err.message, stack: err.stack } :
    { message: err.message, };

const globalError = (err, req, res, next) => res.status(err.status || 500).json(errorFormat(err));

module.exports = globalError;