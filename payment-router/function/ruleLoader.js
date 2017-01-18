var fs = require('fs');
var path = require('path');
var config = require('../common/config');

var ruleCollection = {
    pre: {},
    post: {},
    priority: {}
};

module.exports = {

    /**
     * 先从缓存中加载， 若找不到，则根据type到具体的目录下加载，如果找不到，抛出规则不存在异常
     * 若找到，则加入缓存
     * @param ruleName
     * @param type post|pre|priority
     * @returns {*}
     */
    load: function (ruleName, type) {
        var rule = ruleCollection[type][ruleName];
        if (rule == null || rule == undefined) {
            var newRule = loadRule(ruleName, type);
            if (newRule == null) {
                return new Error("undefinedRuleError" + ruleName);
            }
            rule = newRule;
            ruleCollection[type][ruleName] = rule;
        }
        return rule;

    },
    init: function () {
        //加载所所有的规则
        loadFiles('pre');
        loadFiles('post');
        loadFiles('priority');
    },
    reload: function () {
        //重新加载所有规则
    },
    ruleCollections: ruleCollection

}
var loadFiles = function (type) {
    var typePath = '';
    if (type == 'pre') {
        typePath = 'precondition';
    } else if (type == 'post') {
        typePath = 'postcondition';
    } else if (type == 'priority') {
        typePath = 'priority';
    }
    var dir = __dirname + '/' + config.rulesPath + '/' + typePath;
    fs.readdirSync(dir).forEach(function (fileName) {
        if (!/\.js$/.test(fileName)) {
            return;
        }
        var name = path.basename(fileName, '.js');
        var _load = loadFile('./' + config.rulesPath + '/' + typePath + '/' + fileName);

        ruleCollection[type][name] = _load;
    });

}
var loadFile = function (filePath) {
    return require(filePath);
};
