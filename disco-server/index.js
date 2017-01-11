const PORT = 3000

var logger = require('./logger').logger
var codes = require('./codes')
var server = require('express')()
require('./handlers').add(server)

server.get('/', function (req, res) {
    res.send('Aces!');
})

server.get('/disco/get', function (req, res) {
    logger.debugReq(req)

    res.status(codes.OK)
        .json({items: ['item 1', 'item 2', 'item 3']})
})

server.post('/hist/save', function (req, res) {
    logger.debugReq(req)
    res.status(codes.OK)
        .json(req.body.params)
})

server.listen(PORT, function () {
    logger.info('Running on ' + PORT)
})