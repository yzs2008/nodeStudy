var logger = require('../../../common/logger')('quotaRule');

module.exports = function (request, routerInfo) {
    logger.info('execute qutotaRule!');
    var req = {};
    req.acc = 1;
    req.test = true;
    return req;
}
