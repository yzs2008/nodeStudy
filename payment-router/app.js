var express = require('express')
var app = express()
var logger = require('./common/logger');
var config = require('./common/config');
var db = require('./common/service/mysqlService');
var Q = require('q');
var ruleLoader = require('./core/ruleLoader');
var ruleEngine = require('./core/ruleEngine');
var channelService = require('./common/service/channelService');

var collect = require('./router/collect');

//app.use('/router/collect', collect);

app.get('/', function (req, res) {
    logger.info('accept request.');
    ruleEngine.fire(req);
    res.send('Hello World!' + config.server.name);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    ruleLoader.init();
    console.log('rule loader complete.')
})
