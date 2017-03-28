let logger = require('../../../common/logger')('fundRule');
let commonUtil = require('../../../common/utils/commonUtil');
let returnCode = require('../../../common/consts/returnCode');
let routerConst = require('../../../common/consts/routerConsts');
let fundService = require('../../../daoservice/fundService');

module.exports = function (request, routerInfo) {
    logger.info('execute fundRule!');
    let parent = this;

    return  fundService.getChannelByFund(request.fund).then(function(data){

    });

    return parent.nextRule.doRule(request, result);
};

