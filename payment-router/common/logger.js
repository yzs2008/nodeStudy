var log4js = require('log4js');

log4js.configure('config/log4js-config.json', { reloadSecs: 3600 });

module.exports = function (loggerName) {
    if(loggerName == undefined || loggerName == null || loggerName == ''){
        return log4js.getLogger();
    }
    return log4js.getLogger(loggerName);
}
