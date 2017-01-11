var logger = require('./logger').logger
var codes = require('./codes')

function getItems() {
    return {items: ['item 1', 'item 2', 'item 3']}
}

function routeGet(server) {
    server.get('/disco/get', function (req, res) {
        logger.debugReq(req)

        res.status(codes.OK)
            .json(getItems)
    })
}

module.exports = {
    routeGet: routeGet
}