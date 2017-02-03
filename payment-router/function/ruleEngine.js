var fs = require('fs');
var path = require('path');
var config = require('../common/config');
var productRuleService = require('../common/service/productRuleService');
var g = require('../common/globalVariable');


module.exports = {
    fire: function (req) {
        var accessor = 'default';
        var routerType = 'sign';
        var ruleChain = assemble(accessor, routerType);
        ruleChain[0]();
    }
};

/*
 根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
 */
var assemble = function (accessor, routerType) {
    var ruleChain = {};
    var assembleRuleChain = productRuleService.getRuleContentByAccessor(accessor, routerType);
    assembleRuleChain
        .then(function (data) {
            ruleChain = getRuleChain(data);
            return ruleChain;
        })
        .fail(function (err) {
            return ruleChain;
        });
};

var getRuleChain = function (data) {
    var ruleChain = {};
    var ruleNames = data.split(',');
    for (var i = 0; i < ruleNames.length - 1; i++) {
        var rule = ruleNames[i];
        rule.next = ruleChain[i + 1];
        ruleChain[rule] = app.ruleCollections[rule];

    }
    return ruleChain;
};

var load = function (path, name) {
    if (name) {
        return require(path + name);
    }
    return require(path);
};
