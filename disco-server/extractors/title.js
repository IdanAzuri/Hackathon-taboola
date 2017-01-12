var logger = require('../logger').logger
var codes = require('../codes')
var recommendations = require('../db/recommendations')
var request = require('request')
var cheerio = require('cheerio')

function getData(url, callback) {
    url = 'http://' + url
    logger.debug('getting data...' + url)
    request(url, function (error, response, html) {
        logger.debug(error)
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                json.title = title;
            })
            callback(json)
        }
    })
}

recommendations.getUrls(function (results) {
    var resLen = results.length
    for (var i = 0; i < resLen; i++) {
        var rec = results[i]
        getData(rec.url, function(json) {
            logger.debug('got ' +JSON.stringify(json))
            recommendations.update(rec['url'], json.title)
        })
    }
})