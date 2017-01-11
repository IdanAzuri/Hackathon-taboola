var logger = require('./logger').logger
var codes = require('./codes')
var bodyParser = require("body-parser")

function errorHandler(err, req, res, next) {
    logger.error(err)
    res.status(ERROR)
        .send({error: err})
}

function requestHandler(req, res, next) {
    res.setHeader('access-control-allow-origin', '*')
    next()
}

function add(server) {
    server.use(
        bodyParser.urlencoded({extended: false}),
        bodyParser.json(),
        requestHandler,
        errorHandler)
}

module.exports = {
    add: add
}