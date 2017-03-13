let productRuleService = require('../daoservice/productRuleService');
let ruleDefineService = require('../daoservice/ruleDefineService');
let logger = require('../common/logger')('ruleEngine');
let ruleLoader = require('./ruleLoader');
let routerConsts = require('../common/consts/routerConsts');
let commonUtil = require('../common/utils/commonUtil');
let returnCode = require('../common/consts/returnCode');


module.exports = {
    fire: function (req) {
        let accessor = req.accessor;
        let transType = req.transType;
        return assembleRuleChain(accessor, transType)
            .then(function (ruleChain) {
                if(commonUtil.isEmptyArray(ruleChain)){
                    logger.error('规则链为空', returnCode.router.configError_at_05);
                    throw  returnCode.router.configError_at_05;
                }
                return ruleChain[0].doRule(req);
            });
    }
};

/*
 根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
 */
let assembleRuleChain = function (accessor, transType) {
    return productRuleService.getRuleContentByAccessor(accessor, transType)
                             .then(function (ruleConfig) {
                                 return parseRuleConfig(ruleConfig);
                             })
                             .then(function (ruleNames) {
                                 return getRuleChain(ruleNames);
                             });
};

let getRuleChain = function (ruleNames) {

    let ruleChain = [];
    for(let key in ruleNames){
        let curCollection = ruleNames[key];
        let index = ruleChain.length;
        for (let i = index; i < index + curCollection.length; i++) {
            ruleChain[i] =ruleLoader.load(curCollection[i - index], key);
        }
    }

    let ruleChainResult = [];
    //link the rules
    for (let i = 0; i < ruleChain.length; i++) {
        let item = {};
        item['doRule'] = ruleChain[i];
        ruleChainResult[i] = item;
    }
    for (let i = 0; i < ruleChainResult.length - 1; i++) {
        ruleChainResult[i].nextRule = ruleChainResult[i + 1];
    }
    return ruleChainResult;
};

let parseRuleConfig = function (ruleConfig) {
    let ruleNames = {};

    return getRuleNames(ruleConfig, routerConsts.ruleType.precondition)
        .then(function (data) {
            ruleNames[routerConsts.ruleType.precondition] = data;
            return getRuleNames(ruleConfig, routerConsts.ruleType.priority);
        })
        .then(function (data) {
            ruleNames[routerConsts.ruleType.priority] = data;
            return getRuleNames(ruleConfig, routerConsts.ruleType.postcondition);
        })
        .then(function (data) {
            ruleNames[routerConsts.ruleType.postcondition] = data;
            return ruleNames;
        });
};

let getRuleNames = function (ruleConfig, ruleType) {
    let ruleIdStr = ruleConfig[ruleType];

    if (commonUtil.isEmptyStr(ruleIdStr)) {
        return [];
    }
    let ruleNames = ruleIdStr.split(',');
    return ruleDefineService.getRuleNameByRuleId(ruleNames, ruleType);
};


