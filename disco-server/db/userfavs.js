/**
 * Created by alon.d on 1/12/17.
 */
var connection = require('./db').Pool;
var logger = require('../logger').logger;

function insert(data) {
    var userId = data['userId'];
    var title = data['title'];
    var params = [userId, title];

    var query =
        " REPLACE INTO disco.user_favs (user_id, rec_id)" +
        " VALUES(?,?)";

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err);
        }
    });
}

function get(data, callback) {
    var userId = data['userId'];
    var params = [userId];

    var query =
        " SELECT " +
        "   rec.title, " +
        "   rec.url, " +
        "   rec.thumbnail_url" +
        " FROM disco.user_favs fav" +
        " INNER JOIN disco.recommendations rec" +
        " ON rec.title = fav.title" +
        " WHERE fav.user_id = ?";

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err);
        }
        callback(results);
    });
}


module.exports = {
    get: get,
    insert: insert
};