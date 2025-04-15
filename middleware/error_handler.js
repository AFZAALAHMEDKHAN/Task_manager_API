const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ "error message": err.message })
    }
    return res.status(500).json({ "error": "Something went wrong" })
}

module.exports = errorHandlerMiddleware