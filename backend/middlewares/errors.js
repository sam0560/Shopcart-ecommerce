const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    // Wrong Mongoose object id error
    if (err.name == "CastError") {
      const message = `Resource not found, Invalid: ${err.path}`
      err = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validator error
    if (err.name === 'validationError') {
      const message = Object.values(err.errors).map(value => value.message)
      let error = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",

    });
  }
};
