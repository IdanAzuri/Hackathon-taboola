var logger = require('../logger').logger
var codes = require('../codes')
var db = require('../db/userhistory')

function save(data) {
    if (data) {
        db.saveHistory(data)
    }
    return data
}

function route(server) {
    server.post('/hist/save', function (req, res) {
        res.status(codes.OK)
            .json(save(req.body.params))
    })
}

module.exports = {
    route: route
}