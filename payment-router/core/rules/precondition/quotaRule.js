let logger = require('../../../common/logger')('quotaRule');
let commonUtil = require('../../../common/utils/commonUtil');
let returnCode = require('../../../common/consts/returnCode');
let routerConst = require('../../../common/consts/routerConsts');

module.exports = function (request, routerInfo) {
    logger.info('execute qutotaRule!');
    let parent = this;
    let result = [];
    switch (request.transType){
        case 'COP':
            result = dealWithCop(request, routerInfo);
            break;
        case 'WDC':
            result = dealWithWdc(request, routerInfo);
            break;
        default:
            result = routerInfo;
            break;
    }
    
    if(commonUtil.isEmptyArray(result)){
        throw returnCode.router.no_router_found_at_quota;
    }
    
    return parent.nextRule.doRule(request, result);
};

let dealWithCop = function (request, routerInfo) {
    let transAmount = request.amount;
    let result = [];

    for(let i = 0;i< routerInfo.length; i++){
        if(request.busiType == routerConst.busiType.forCorporate){
            //代收业务，控制渠道最小值
            if(transAmount >= routerInfo[i].publicMin){
                result.push(routerInfo[i]);
            }
        }else {
            if(transAmount >= routerInfo[i].privateMin){
                result.push(routerInfo[i]);
            }
        }
    }
    
    return result;
    
};

let dealWithWdc = function (request, routerInfo) {
    let transAmount = request.amount;
    let result = [];

    for(let i = 0;i< routerInfo.length; i++){
        if(request.busiType == routerConst.busiType.forCorporate){
            //代付业务，控制渠道最大值
            if(transAmount <= routerInfo[i].publicMax){
                result.push(routerInfo[i]);
            }
        }else {
            if(transAmount <= routerInfo[i].privateMax){
                result.push(routerInfo[i]);
            }
        }
    }

    return result;
};
