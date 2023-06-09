const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.name)
}

module.exports = {
    errorHandlerMiddleware
}
