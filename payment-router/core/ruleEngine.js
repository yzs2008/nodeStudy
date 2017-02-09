var fs = require('fs');
var path = require('path');
var config = require('../common/config');
var productRuleService = require('../service/productRuleService');
var ruleDefineService = require('../service/ruleDefineService');
var logger = require('../common/logger')('ruleEngine');
var ruleLoader = require('./ruleLoader');
var consts = require('../common/consts/routerConsts');


module.exports = {
    fire: function (req) {
        var accessor = 'yzs';
        var routerType = 'COP';
        return assemble(accessor, routerType)
            .then(function (ruleChain) {
                return ruleChain[0].doRule(req);
            }).fail(function (err) {
                logger.info(err);
            });
    }
};

/*
 根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
 */
var assemble = function (accessor, routerType) {
    return productRuleService.getRuleContentByAccessor(accessor, routerType)
                             .then(function (data) {
                                 return getRuleName(data);
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

    for (var rr = 0; rr < ruleChainResult.length - 1; rr++) {
        ruleChainResult[rr].nextRule = ruleChainResult[rr + 1];
    }
    return ruleChainResult;
};

var getRuleName = function (rawData) {
    var ruleNames = {};

    return getRuleNames(rawData, consts.ruleType.precondition)
        .then(function (data) {
            ruleNames[consts.ruleType.precondition] = data;
            return getRuleNames(rawData, consts.ruleType.priority);
        })
        .then(function (data) {
            ruleNames[consts.ruleType.priority] = data;
            return getRuleNames(rawData, consts.ruleType.postcondition);
        })
        .then(function (data) {
            ruleNames[consts.ruleType.postcondition] = data;
            return ruleNames;
        })
        .fail(function (err) {
            logger.error(err);
        });
};

var getRuleNames = function (data, ruleType) {
    var keyword = consts.ruleTypeConverter(ruleType);
    var ruleIdStr = data[0][keyword];
    if (ruleIdStr == undefined || ruleIdStr == null || ruleIdStr == '') {
        return [];
    }
    var ruleNames = data[0][keyword].split(',');
    return ruleDefineService.getRuleNameByRuleId(ruleNames, ruleType);
};


