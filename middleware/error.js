const { handerError } = require('../utils/errorHandler')
exports.errHandler = (err, req, res, next) => {
    handerError(err, res);
}