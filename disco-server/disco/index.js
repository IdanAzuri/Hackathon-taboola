var logger = require('../logger').logger
var codes = require('../codes')
var recommendations = require('../db/recommendations')

function getItems(data) {
    if (data) {
        return recommendations.get(data)
    }
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
        logger.debug(req.body.params)
        var recs = getItems(req.body.params)
        logger.debug(recs)
        res.status(codes.OK)
            .json(getItems())
    })
}

module.exports = {
    route: route
}