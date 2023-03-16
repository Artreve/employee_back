const httpStatusCodes = require('./httpStatusCode')
const BaseError = require('./BaseError')

class BadRequestError extends BaseError {
    constructor(name, description = "Bad request") {
        super(name, httpStatusCodes.BAD_REQUEST, description)
    }
}

module.exports = BadRequestError