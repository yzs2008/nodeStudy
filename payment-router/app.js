var express = require('express')
var app = express()
var logger = require('./common/logger')('application');
var config = require('./common/config');

var ruleLoader = require('./core/ruleLoader');

var collect = require('./router/collect');

app.use('/router/collect', collect);

app.listen(config.http.port, function () {
    logger.info('Application begin to listening on port',config.http.port);
    ruleLoader.init();
    logger.info('Application started completely. listening on port',config.http.port);
})
