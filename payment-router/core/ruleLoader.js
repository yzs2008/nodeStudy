var fs = require('fs');
var path = require('path');
var routerConsts = require('../common/consts/routerConsts');
var g = require('../common/globalVariable');

var ruleCollection = {
    precondition: {},
    postcondition: {},
    priority: {}
};

module.exports = {

    /**
     * 先从缓存中加载， 若找不到，则根据type到具体的目录下加载，如果找不到，抛出规则不存在异常
     * 若找到，则加入缓存
     * @param ruleName
     * @param type postcondition|precondition|priority
     * @returns {*}
     */
    load: function (ruleName, ruleType) {
        var rule = ruleCollection[ruleType][ruleName];
        if (rule == null || rule == undefined) {
            var newRule = loadRule(ruleName, ruleType);
            if (newRule == null) {
                return new Error("undefinedRuleError:" + ruleName);
            }
            rule = newRule;
            ruleCollection[ruleType][ruleName] = rule;
        }
        return rule;

    },
    init: function () {
        //加载所所有的规则
        var ruleType = routerConsts.ruleType;
        Object.keys(ruleType).forEach(function (key) {
            loadRuleCollection(ruleType[key]);
        });
        g.ruleCollection = ruleCollection;
    },
    reload: function () {
        //重新加载所有规则
    },
    ruleCollections: ruleCollection

}
var loadRuleCollection = function (rType) {
    var rulesPath = __dirname + '/rules/' + rType;
    fs.readdirSync(rulesPath).forEach(function (fileName) {
        if (!/\.js$/.test(fileName)) {
            return;
        }
        var ruleName = path.basename(fileName, '.js');
        var filePath = './rules/' + rType + '/' + fileName;
        var rule = loadRule(filePath);

        ruleCollection[rType][ruleName] = rule;
    });
}
var loadRule = function (filePath) {
    return require(filePath);
};
