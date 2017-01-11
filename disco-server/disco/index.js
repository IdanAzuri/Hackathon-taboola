var logger = require('../logger').logger
var codes = require('../codes')

function getItems() {
    return {
        items:[
            ['youtube.com','taboola.png'],
            ['netflix.com','taboola.png'],
            ['imdb.com','taboola.png'],
            ['wikia.com','taboola.png'],
            ['deviantart.com','taboola.png']
        ]
    }
}

function route(server) {
    server.get('/disco/get', function (req, res) {
        logger.debugReq(req)

        res.status(codes.OK)
            .json(getItems)
    })
}

module.exports = {
    route: route
}