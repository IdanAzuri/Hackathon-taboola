var codes = require('../codes')
const uuid = require('uuid/v4');

function initUser() {
    return uuid()
}

function route(server) {
    server.get('/initUser', function (req, res) {
        res.status(codes.OK)
            .json(initUser())
    })
}

module.exports = {
    route: route
}