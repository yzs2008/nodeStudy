var express = require('express')
var app = express()
var logger = require('./common/logger');
var config = require('./common/config');
var db = require('./common/service/mysqlService');
var Q = require('q');
var ruleLoader = require('./function/ruleLoader');
var ruleEngine = require('./function/ruleEngine');
var channelService = require('./common/service/channelService');

var collect = require('./router/collect');
/*
 var logger = require('./common/logger');
 var config = require('./common/config');
 var db = require('./common/service/mysqlService');
 var Q = require('q');
 var ruleEngine = require('./core/ruleLoader');
 //var ruleEngine = require('./core/ruleEngine');
 var channelService = require('./common/service/channelService');
 */

app.use('/router/collect', collect);

/*
app.get('/', function (req, res) {
    logger.info('accept request.');
    ruleEngine.fire(req);
    res.send('Hello World!' + config.server.name);

    logger.info("hello rules");
    var result = rules['queryChannelRule']();
    var re = result({name: "hello"}, {bank: "CMB"});
    logger.info(re[0].bank);
     var promise = db.queryOne();
     promise.then(core (data) {
     for(var i = 0; i< data.length; i++){
     logger.info(data[i]);
     }
     }).fail(core (err) {
     logger.error(err);
     });
    logger.info('deal request done.');
})
 */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    ruleLoader.init();
    console.log('rule loader complete.')
})
