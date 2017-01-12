const PORT = 3005

var logger = require('./logger').logger
var codes = require('./codes')
var server = require('express')()
require('./handlers').add(server)
var disco = require('./disco')
var hist = require('./hist')
var user = require('./user')
//var titles = require('./extractors/title')

user.route(server)
disco.route(server)
hist.route(server)

server.get('/', function (req, res) {
    res.send('Aces!');
})

function init(port) {
    server.listen(port, function () {
        logger.info('Running on ' + port)
    })
}

init(PORT)