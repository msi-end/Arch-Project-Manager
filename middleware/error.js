const { ErrorComposer } = require('../utils/errorHandler')
const ws = require('winston');
const { format, transports } = require('winston');
const wsErrorLog = ws.createLogger({
  level: 'info', format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './src/storage/erros.log' })]
})
const wsErrorLoger = (err, req) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else {
    wsErrorLog.error({
      statusCode: err.statusCode || 500,
      message: err.message,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      Error:err,
    })
  }
}

exports.errHandler = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  wsErrorLoger(err, req)

  // MSQL Error List
  if (req.accepts('json')) {
    ErrorComposer(err, res)
  }
};

