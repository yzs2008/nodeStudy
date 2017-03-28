let logger = require('../../../common/logger')('fundRule');
let commonUtil = require('../../../common/utils/commonUtil');
let returnCode = require('../../../common/consts/returnCode');
let fundService = require('../../../daoservice/fundService');

module.exports = function (request, routerInfo) {
    logger.info('execute fundRule!');
    let parent = this;
    let parentChannelList = getParentChannelList(routerInfo);
    return fundService.getChannelByFund(request.fund, parentChannelList)
                      .then(function (fundResult) {
                          if (commonUtil.isEmptyArray(fundResult)) {
                              logger.error('路由结果为空', returnCode.router.no_router_found_at_fund);
                              throw returnCode.router.no_router_found_at_fund;
                          }
                          return parent.nextRule.doRule(request, filterByFund(routerInfo, fundResult));
                      });
};

let getParentChannelList = function (routerInfo) {
    let parentSet = [];
    for (let i = 0; i < routerInfo.length; i++) {
        let item = routerInfo[i];
        if (parentSet.indexOf(item.parent) != -1) {
            continue;
        }
        parentSet.push(item.parent);
    }
    return parentSet;
};

let filterByFund = function (routerInfo, fundResult) {
    let routerList = [];
    for (let i = 0; i < routerInfo.length; i++) {
        let item = routerInfo[i];
        if (fundResult.indexOf(item.parent) != -1) {
            routerList.push(item.parent);
        }
    }
    return routerList;
};
