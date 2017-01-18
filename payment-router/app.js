var express = require('express')
var app = express()
var logger = require('./common/logger');
var config = require('./common/config');
var db = require('./common/service/mysqlService');
var Q = require('q');
var ruleEngine = require('./function/ruleLoader');
//var ruleEngine = require('./function/ruleEngine');
var channelService = require('./common/service/channelService');

app.get('/', function (req, res) {
    logger.info('accept request.');
    ruleEngine.init();
    var rules = ruleEngine.ruleCollections;
    res.send('Hello World!' + config.server.name);

    /*logger.info("hello rules");
    var result = rules['queryChannelRule']();
    var re=result({name:"hello"},{bank:"CMB"});
    logger.info(re[0].bank);*/
/*
    var promise = db.queryOne();
    promise.then(function (data) {
        for(var i = 0; i< data.length; i++){
            logger.info(data[i]);
        }
    }).fail(function (err) {
        logger.error(err);
    });
    */
    logger.info('deal request done.');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})