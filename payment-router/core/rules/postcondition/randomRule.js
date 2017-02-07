var logger = require('../../../common/logger')('randomRule');

module.exports = function (request, routerInfo) {
    logger.info('execute randomRule.');
    return {"key":"hello word"};
}
