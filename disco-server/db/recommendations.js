var logger = require('../logger').logger
var connection = require('./db').Pool

function get(data, callback) {
    var userId = data['userId']
    var params = [userId, userId]

    var query =
        ' SELECT  recs_for_top_cat.url, recs_for_top_cat.thumbnail_url thumbnail_url' +
        '         ' +
        ' FROM    (' +
        '     SELECT  r.*' +
        ' FROM    recommendations r' +
        ' INNER JOIN (' +
        '     SELECT  category,' +
        ' COUNT(*) AS num_views' +
        ' FROM    (select uh.user_id, t.category from user_history uh cross join (select category from category order by rand() limit 2) t ) tt' +
        ' WHERE   user_id = ?' +
        ' GROUP BY category' +
        ' ORDER BY num_views DESC' +
        ' LIMIT 2 ) AS user_top_categories' +
        ' ON user_top_categories.category = r.category' +
        ' ORDER BY rank ASC' +
        ' LIMIT 10' +
        ' ) recs_for_top_cat' +
        ' WHERE   NOT EXISTS(' +
        '     SELECT   1' +
        ' FROM    user_history' +
        ' WHERE   user_id = ?' +
        ' AND url = recs_for_top_cat.url)'

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err)
        }
        callback({items: results})
    });
}

module.exports = {
    get: get
}