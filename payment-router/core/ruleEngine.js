let fs = require('fs');
let path = require('path');
let config = require('../common/config');
let productRuleService = require('../daoservice/productRuleService');
let ruleDefineService = require('../daoservice/ruleDefineService');
let logger = require('../common/logger')('ruleEngine');
let ruleLoader = require('./ruleLoader');
let routerConsts = require('../common/consts/routerConsts');
let commonUtil = require('../common/utils/commonUtil');


module.exports = {
    fire: function (req) {
        let accessor = req.accessor;
        let transType = req.transType;
        return assembleRuleChain(accessor, transType)
            .then(function (ruleChain) {
                return ruleChain[0].doRule(req);
            });
    }
};

/*
 根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
 */
var assembleRuleChain = function (accessor, transType) {
    return productRuleService.getRuleContentByAccessor(accessor, transType)
                             .then(function (rawData) {
                                 return parseRuleConfig(rawData);
                             })
                             .then(function (ruleNames) {
                                 return getRuleChain(ruleNames);
                             });
};

var getRuleChain = function (ruleNames) {

    var ruleChain = [];
    Object.keys(ruleNames).forEach(function (key) {
        var curCollection = ruleNames[key];
        var index = ruleChain.length;
        for (var i = index; i < index + curCollection.length; i++) {
            var rule = ruleLoader.load(curCollection[i - index], key);
            ruleChain[i] = rule;
        }
    });

    var ruleChainResult = [];
    //link the rules
    for (var i = 0; i < ruleChain.length; i++) {
        var item = {};
        item['doRule'] = ruleChain[i];
        ruleChainResult[i] = item;
    }
    for (var i = 0; i < ruleChainResult.length - 1; i++) {
        ruleChainResult[i].nextRule = ruleChainResult[i + 1];
    }
    return ruleChainResult;
};

var parseRuleConfig = function (rawData) {
    var ruleNames = {};

    return getRuleNames(rawData, routerConsts.ruleType.precondition)
        .then(function (data) {
            ruleNames[routerConsts.ruleType.precondition] = data;
            return getRuleNames(rawData, routerConsts.ruleType.priority);
        })
        .then(function (data) {
            ruleNames[routerConsts.ruleType.priority] = data;
            return getRuleNames(rawData, routerConsts.ruleType.postcondition);
        })
        .then(function (data) {
            ruleNames[routerConsts.ruleType.postcondition] = data;
            return ruleNames;
        });
};

var getRuleNames = function (rawData, ruleType) {
    var keyword = routerConsts.ruleTypeConverter(ruleType);
    var ruleIdStr = rawData[keyword];
    if (ruleIdStr == undefined || ruleIdStr == null || ruleIdStr == '') {
        return [];
    }
    var ruleNames = ruleIdStr.split(',');
    return ruleDefineService.getRuleNameByRuleId(ruleNames, ruleType);
};


