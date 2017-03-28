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
                         .spread(function (routerList, parentList) {
                             routerInfo = filterByParentStatus(routerList, parentList);

                             if (commonUtil.isEmptyArray(routerInfo)) {
                                 logger.info(returnCode.router.no_router_found_at_parent_channel,
                                             '参数 transType:', request.transType, 'instCode:', request.instCode);
                                 throw returnCode.router.no_router_found_at_parent_channel;
                             }

                             return parent.nextRule.doRule(request, routerInfo);
                         });
};

let selectParentStatus = function (routerList) {
    let parentSet = [];
    for (let i = 0; i < routerList.length; i++) {
        let item = routerList[i];
        if (parentSet.indexOf(item.parent) != -1) {
            continue;
        }
        parentSet.push(item.parent);
    }

    return [routerList, channelService.getParentChannelStatus(parentSet)];
};

let filterByParentStatus = function (routerList, parentList) {
    let result = [];
    if (commonUtil.isEmptyArray(parentList)) {
        return result;
    }
    for (let i = 0; i < routerList.length; i++) {
        if (parentList.indexOf(routerList[i].parent) != -1) {
            result.push(routerList[i]);
        }
    }
    return result;
};
