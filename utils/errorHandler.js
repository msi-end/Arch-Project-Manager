class errorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
const ErrorComposer = (err, res) => {
    const { statusCode, message } = err;
    if (res.headersSent) {
        return next(err);
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}
module.exports = { errorHandler, ErrorComposer }