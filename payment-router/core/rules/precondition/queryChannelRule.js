let logger = require('../../../common/logger')('queryChannelRule');
let channelService = require('../../../daoservice/channelService');
let commonUtil = require('../../../common/utils/commonUtil');
let returnCode = require('../../../common/consts/returnCode');

module.exports = function (request, routerInfo) {
    logger.info('exeucte queryChannelRule.');
    let parent = this;
    return channelService.getChannelByInstCode(request.transType, request.instCode)
                         .then(function (routerList) {
                             if (commonUtil.isEmptyArray(routerList)) {
                                 logger.info(returnCode.router.no_router_found_at_channel,
                                             '参数 transType:', request.transType, 'instCode:', request.instCode);
                                 throw returnCode.router.no_router_found_at_channel;
                             }
                             return selectParentStatus(routerList);
                         })
                         .then(function (routerList, parentList) {
                             routerInfo = filterByParentStatus(routerList, parentList);

                             if (commonUtil.isEmptyArray(routerInfo)) {
                                 logger.info(returnCode.router.no_router_found_at_parent_channel,
                                             '参数 transType:', request.transType, 'instCode:', request.instCode);
                                 throw returnCode.router.no_router_found_at_channel;
                             }

                             return parent.nextRule.doRule(request, routerInfo);
                         });
};

let selectParentStatus = function (routerList) {
    let parentSet = {};
    for (let item in routerList) {
        if (parentSet.contains(item.parent)) {
            continue;
        }
        parentSet[item.parent] = item.parent;
    }

    return [routerList, channelService.getParentChannelStatus(parentSet)];
};

let filterByParentStatus = function (routerList, parentList) {

};
