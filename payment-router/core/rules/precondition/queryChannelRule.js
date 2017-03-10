var logger = require('../../../common/logger')('queryChannelRule');
var channelService = require('../../../daoservice/channelService');
var commonUtil = require('../../../common/utils/commonUtil');

module.exports = function (request, routerInfo) {
    logger.info('exeucte queryChannelRule.');
    routerInfo = {};
    var parent = this;
    return channelService.getChannelByInstCode(request.transType, request.instCode)
                         .then(function (data) {
                             if (true || !commonUtil.isEmptyArray(data)) {
                                 
                                 
                                 
                                 throw {
                                     code:"20001",
                                     msg:"无可用路由"
                                 };
                             }
                             return parent.nextRule.doRule(request, routerInfo);
                         })
                         .fail(function (err) {
                             logger.info('路由异常', err);
                             throw new Error('no router find');
                         });
};
