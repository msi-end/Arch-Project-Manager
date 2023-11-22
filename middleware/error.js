const { ErrorComposer } = require('../utils/errorHandler')
exports.errHandler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;


  // MSQL Error List
  if (err.code === 11000) {
    err.message = "Duplicate Key Error";
    err.statusCode = 400;
  }
  ErrorComposer(err, res)
  // res.status().json({
  //   success: false,
  //   message: err,
  // });
};

