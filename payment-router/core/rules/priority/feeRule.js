var logger = require('../../../common/logger')('feeRule');

module.exports = function (request, routerInfo) {
    logger.info('execute fee rule!');
    return this[0].next(request, routerInfo);
};