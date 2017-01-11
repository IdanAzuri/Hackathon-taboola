var logger = require('log4js').getLogger()



function debugReq(req) {
    logger.debug(req.route.path + ": \n params=" + JSON.stringify(req.body.params))
}

logger.debugReq = debugReq

module.exports = {
    logger: logger
}