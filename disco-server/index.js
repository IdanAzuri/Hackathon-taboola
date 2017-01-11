const PORT = 3000

var logger = require('./logger').logger
var codes = require('./codes')
var server = require('express')()
require('./handlers').add(server)
var disco = require('./disco')
var hist = require('./hist')

disco.route(server)
hist.route(server)

server.get('/', function (req, res) {
    res.send('Aces!');
})



server.listen(PORT, function () {
    logger.info('Running on ' + PORT)
})