var logger = require('../logger').logger
var connection = require('./db').Pool
var common = require('../extractors/common')

function UserHistory(userId, data) {
    var parameters = []
    title = data['title']
    pageUrl = data['url']
    url = common.getDomain(pageUrl)
    lastVisitTime = data['lastVisitTime']
    parameters.push(userId, title, url, pageUrl, new Date(Number(lastVisitTime)))
    return parameters
}

function saveHistory(data) {
    logger.debug(data)
    if (!data) {
        return
    }
    var dataLen = data['urls'].length

    var insertStatement = 'INSERT INTO disco.user_history (user_id, title, url, page_url, visit_time) VALUES '
    var params = []

    var userId = data['userId']
    var urls = data['urls']
    for (var i = 0; i < dataLen; i++) {
        var userHistory = new UserHistory(userId, urls[i])
        params = params.concat(userHistory)
        insertStatement += '(?, ?,?, ?, ?)'
        if (i < dataLen - 1) {
            insertStatement += ', '
        }
    }

    connection.query(insertStatement, params, function (err, results, fields) {
        if (err) {
            logger.error(err)
        }
    });
}

module.exports = {
    saveHistory: saveHistory
}