let dao = require('./mysqlService');
let logger = require('../common/logger')('ruleDefineService');
let commonUtil = require('../common/utils/commonUtil');
let returnCode = require('../common/consts/returnCode');
let redisClient = require('../common/wrapper/redisWrapper');

module.exports = {
    getRuleNameByRuleId: function (ruleIdList, routerType) {
        let queryStr = "select bean_id from router_rule_def where rule_id in (?) and rule_type = ?";
        let paramObjs = [ruleIdList, routerType];
        let redisKey = 'getRuleNameByRuleId_' + routerType + JSON.stringify(ruleIdList);
        return redisClient.get(redisKey).then(function (cachedResult) {
            if (commonUtil.isEmptyObj(cachedResult)) {
                return dao.queryList(queryStr, paramObjs)
                          .then(function (rawData) {
                              if (commonUtil.isEmptyArray(rawData)) {
                                  logger.error('读取规则名称失败', returnCode.router.configError_at_03);
                                  throw returnCode.router.configError_at_03;
                              }
                              let result = [];
                              for (let i = 0; i < rawData.length; i++) {
                                  result[i] = rawData[i]['bean_id'];
                              }
                              redisClient.set(redisKey, JSON.stringify(result));
                              return result;
                          });
            }
            return JSON.parse(cachedResult);
        });
    }
};
