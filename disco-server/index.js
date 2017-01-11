const OK = 200
const ERROR = 500
const PORT = 3000

var server = require('express')()
var bodyParser = require("body-parser")
var logger = require('./logger').logger

function errorHandler(err, req, res, next) {
    logger.error(err)
	res.status(ERROR)
        .send({ error: err })
}

function requestHandler(req, res, next) {
    res.setHeader('access-control-allow-origin', '*')
    next()
}

server.use(
	bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    requestHandler,
    errorHandler
)

server.get('/', function(req, res) {
	res.send('Aces!');
})

server.get('/disco/get', function(req, res) {
	logger.debugReq(req)

	res.status(OK)
		.json({ items: ['item 1', 'item 2', 'item 3']})
})

server.post('/hist/save', function(req, res) {
    logger.debugReq(req)
	res.status(OK)
		.json(req.body.params)
})

server.listen(PORT, function() {
    logger.info('Running on ' + PORT)
})