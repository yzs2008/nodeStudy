let fs = require('fs');
let path = require('path');
let routerConsts = require('../common/consts/routerConsts');
let logger = require('../common/logger')('ruleLoader');
let commonUtil = require('../common/utils/commonUtil');
let returnCode = require('../common/consts/returnCode');


let ruleCollection = {
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
        let rule = ruleCollection[ruleType][ruleName];
        if (commonUtil.isEmptyObj(rule)) {
            let newRule = loadRule(ruleType, ruleName);
            rule = newRule;
            ruleCollection[ruleType][ruleName] = rule;
        }
        return rule;

    },
    init: function () {
        //加载所所有的规则
        logger.info('start to load all rules.');
        let ruleType = routerConsts.ruleType;
        for (let rt in  ruleType) {
            initRuleCollection(ruleType[rt], ruleCollection);
        }
        logger.info('load all rules complete.');
    },
    reload: function () {
        //重新加载所有规则
        logger.info('start to reload all rules.');
        let ruleType = routerConsts.ruleType;
        let rCollection = {
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

};
let initRuleCollection = function (rType, rCollection) {
    logger.info('start to load ', rType, 'rules.')

    let rulesPath = __dirname + '/rules/' + rType;
    fs.readdirSync(rulesPath).forEach(function (fileName) {
        if (!/\.js$/.test(fileName)) {
            logger.warn('incorrect file in ', rType, 'rule folder.', fileName, 'skipped!');
            return;
        }
        let ruleName = path.basename(fileName, '.js');
        let rule = loadRule(rType, fileName);

        rCollection[rType][ruleName] = rule;

        logger.info('load rule ', ruleName);
    });

    logger.info('load ', rType, 'rules complete.')
};
let loadRule = function (ruleType, ruleName) {
    let filePath = './rules/' + ruleType + '/' + ruleName;
    try{
       return require(filePath);
    }catch(e) {
        logger.error('加载规则出错', e.message);
        throw returnCode.router.configError_at_04;
    }
};
