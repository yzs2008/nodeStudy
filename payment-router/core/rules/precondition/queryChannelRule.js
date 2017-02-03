var logger = require('../../../common/logger');

module.exports = function (request, routerInfo) {
    logger.info('exeucte queryChannelRule.')
    return this.next();
}
