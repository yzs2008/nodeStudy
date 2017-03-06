let express = require('express');
let app = express();
let logger = require('./common/logger')('application');
let config = require('./common/config');
let bodyParser = require('body-parser');

let ruleLoader = require('./core/ruleLoader');
let collect = require('./router/collect');

app.use(bodyParser.json());

app.use('/router/collect', collect);

app.listen(config.http.port, function () {
    logger.info('Application begin to listening on port', config.http.port);
    ruleLoader.init();
    logger.info('Application started completely. listening on port', config.http.port);
});
