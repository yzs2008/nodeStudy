var fs = require('fs');
var path = require('path');
var routerConsts = require('../common/consts/routerConsts');
var logger = require('../common/logger')('ruleLoader');

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
     * @param ruleType postcondition|precondition|priority
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
        logger.info('start to load all rules.');
        let ruleType = routerConsts.ruleType;
        for(let rt in  ruleType){
            initRuleCollection(ruleType[rt], ruleCollection);
        }
        logger.info('load all rules complete.');
    },
    reload: function () {
        //重新加载所有规则
        logger.info('start to reload all rules.');
        var ruleType = routerConsts.ruleType;
        var rCollection = {
            precondition: {},
            postcondition: {},
            priority: {}
        };
        Object.keys(ruleType).forEach(function (key) {
            initRuleCollection(ruleType[key], rCollection);
        });
        ruleCollection = rCollection;
        logger.info('reload all rules complete.');
    },
    ruleCollections: ruleCollection

}
let initRuleCollection = function (rType, rCollection) {
    logger.info('start to load ', rType, 'rules.')

    let rulesPath = __dirname + '/rules/' + rType;
    fs.readdirSync(rulesPath).forEach(function (fileName) {
        if (!/\.js$/.test(fileName)) {
            logger.warn('incorrect file in ', rType, 'rule folder.', fileName, 'skipped!');
            return;
        }
        let ruleName = path.basename(fileName, '.js');
        let filePath = './rules/' + rType + '/' + fileName;
        let rule = loadRule(filePath);

        rCollection[rType][ruleName] = rule;

        logger.info('load rule ', ruleName);
    });

    logger.info('load ', rType, 'rules complete.')
}
let loadRule = function (filePath) {
    return require(filePath);
};
