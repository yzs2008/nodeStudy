var logger = require('../../../common/logger')('queryChannelRule');
var channelService = require('../../../daoservice/channelService');
var commonUtil = require('../../../common/utils/commonUtil');

module.exports = function (request, routerInfo) {
    logger.info('exeucte queryChannelRule.');
    routerInfo = {};
    var parent = this;
    return channelService.getChannelByInstCode(request.transType, request.instCode)
                         .then(function (data) {
                             if(commonUtil.isEmptyArray(data)){
                                 throw new Error('no router find');
                             }
                             parent.nextRule.doRule(request, routerInfo);
                         })
                         .fail(function (err) {
                             throw new Error('no router find');
                         });
};
