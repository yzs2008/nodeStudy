var log4js = require('log4js');
log4js.configure('./config/log4js-config.json', { reloadSecs: 3600 });
var logger = log4js.getLogger();

module.exports = logger;
