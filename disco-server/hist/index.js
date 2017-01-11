var logger = require('../logger').logger
var codes = require('../codes')

function route(server) {
    server.post('/hist/save', function (req, res) {
        logger.debugReq(req)
        res.status(codes.OK)
            .json(req.body.params)
    })
}

module.exports = {
    route: route
}