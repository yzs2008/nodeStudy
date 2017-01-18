var express = require('express')
var app = express()
var logger = require('./common/logger');
var config = require('./common/config');
var db = require('./common/service/mysql');
var Q = require('q');
var ruleEngin = require('./function/ruleLoader');

app.get('/', function (req, res) {
    logger.info('accept request.');
    res.send('Hello World!' + config.server.name);
    var rules = ruleEngin();
    logger.info("hello rules");
    var result = rules['queryChannelRule']();
    var re=result({name:"hello"},{bank:"CMB"});
    logger.info(re[0].bank);
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