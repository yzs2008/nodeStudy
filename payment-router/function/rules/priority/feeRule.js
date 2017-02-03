var logger = require('../../../common/logger');

module.exports = function (request, routerInfo) {
    logger.info('execute fee rule!');
    return routerInfo;
}