var logger = require('../logger').logger
var connection = require('./db').Pool

function getUrls(callback) {
    var query = 'SELECT url from disco.recommendations'

    connection.query(query, function (err, results, fields) {
        if (err) {
            logger.error(err)
        }
        callback(results)
    });
}
function update(url, title) {
    var params = [title, url]
    var query = 'update disco.recommendations set title = ? where url = ?'

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err)
        }
    });
}

function get(data, callback) {
    var userId = data['userId']
    var params = [userId, userId]

    var query =
    " SELECT  rec.title, " +
        " rec.url, " +
        " rec.thumbnail_url," +
        " CASE WHEN FLOOR(RAND()*100)%7=0 THEN 1 ELSE 0 END is_trending," +
        " (1 + top_user_cat.cnt) * 1000 AS also_like " +
    " FROM    disco.recommendations rec " +
    " INNER JOIN (    SELECT  his.category, " +
        " COUNT(id) cnt" +
    " FROM    disco.user_history his " +
    " WHERE   his.user_id = ? " +
        " AND his.category IS NOT NULL " +
    " AND his.category <> 'NOT_SUPPORTED' " +
    " GROUP BY category " +
    " ORDER BY COUNT(id) DESC " +
    " LIMIT 2) AS top_user_cat " +
    " ON LOWER(top_user_cat.category) = LOWER(rec.category) " +
    " WHERE LENGTH(rec.title) > 1 AND LENGTH(rec.title) < 35 " +
    "   AND NOT EXISTS ( " +
        " SELECT  1 " +
    " FROM    user_history h " +
    " WHERE   h.user_id = ? " +
        " AND h.url = rec.url) " +
    " ORDER BY RAND(), " +
        " is_trending," +
        " rank ASC " +
    " LIMIT 5 "

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err)
        }
        logger.debug(results)
        callback({items: results}, data)
    });
}

module.exports = {
    get: get,
    getUrls: getUrls,
    update: update
}