var logger = require('../logger').logger
var codes = require('../codes')
var db = require('../db/userhistory')

function route(server) {
    server.post('/hist/save', function (req, res) {
        db.saveHistory(req.body.params)
        res.status(codes.OK)
            .json(req.body.params)
    })
}

module.exports = {
    route: route
}