var logger = require('../../../common/logger')('queryChannelRule');

module.exports = function (request, routerInfo) {
    logger.info('exeucte queryChannelRule.');
    var boolean = 1==2;
    if(boolean){
        throw error('no router find');
    }
    return this.nextRule.doRule(request, routerInfo);
}
