var fs = require('fs');
var path = require('path');
var config = require('../common/config');
var productRuleService = require('../service/productRuleService');
var g = require('../common/globalVariable');
var logger = require('../common/logger')('ruleEngine');
var ruleLoader = require('./ruleLoader');
var consts = require('../common/consts/routerConsts');


module.exports = {
    fire: function (req) {
        var accessor = 'yzs';
        var routerType = 'COP';
        return assemble(accessor, routerType)
            .then(function (data) {
                return data[0](req);
            }).fail(function (err) {
                logger.info(err);
            });
    }
};

/*
 根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
 */
var assemble = function (accessor, routerType) {
    //var data = productRuleService.getRuleContentByAccessor(accessor, routerType);
    return productRuleService.getRuleContentByAccessor(accessor, routerType)
        .then(function (data) {
            var ruleChain = {};
            ruleChain = getRuleChain(data);
            return ruleChain;
        });
    //ruleChain = getRuleChain(data);
};

var getRuleChain = function (data) {
    var ruleChain = [];
    var ruleType = consts.ruleType.pre;
    var ruleNames = data[0]['pre_rule_content'].split(',');
    for (var i = 0; i < ruleNames.length; i++) {
        var rule = ruleLoader.load(ruleNames[i], ruleType);
        //var rule = g.ruleCollection['precondition'][ruleNames[i]];
        //rule.next = g.ruleCollection['precondition'][ruleNames[i + 1]];
        ruleChain[i] = rule;
    }
    //link the rules
    for (var i = 0; i < ruleChain.length - 1; i++) {
        ruleChain[i].next = ruleChain[i + 1];
    }
    return ruleChain;
};

