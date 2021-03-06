/**
 * Created by alon.d on 1/12/17.
 */
var connection = require('./db').Pool;
var logger = require('../logger').logger;


function hasData(data, callback) {
    logger.info('hasData');
    var userId = data['userId'].substring(1, data['userId'].length-1);
    var params = [userId];

    var query =
        ' SELECT COUNT(*) as num' +
        ' FROM user_data' +
        ' WHERE user_id = ? AND udata IS NOT NULL';

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err);
        }
        callback(results[0].num != 0);
    });
}

function insert(data) {
    var userId = data['userId'].substring(1, data['userId'].length-1);
    var userData = data['userGender'];
    var params = [userId,userData];

    var query =
        ' REPLACE INTO user_data( user_id,udata)' +
        ' VALUES (?,?)';

    connection.query(query, params, function (err, results, fields) {
        if (err) {
            logger.error(err);
        }
    });
}

module.exports = {
    hasData: hasData,
    insert: insert
};