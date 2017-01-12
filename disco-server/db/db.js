const HOST = '172.25.8.114'
const PORT = 3309
const USER = 'hack'
const PASSWORD = 'taboola'
const DATABASE = 'disco'
const POOL_SIZE = 10

var logger = require('../logger').logger

var pool = (function () {
    var instance;

    function Pool() {
        var logger = require('../logger').logger
        var mysql = require('mysql')

        var options = {
            connectionLimit: POOL_SIZE,
            host: HOST,
            port: PORT,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        }

        logger.debug('Initializing pool ' + JSON.stringify(options))
        instance = mysql.createPool(options)
        return instance;
    }

    return {
        getInstance: function () {
            if (instance == null) {
                instance = new Pool();
            } else {
                logger.debug('Already initialized pool')
            }
            return instance;
        }
    };
})();

module.exports = {
    Pool: pool.getInstance()
}