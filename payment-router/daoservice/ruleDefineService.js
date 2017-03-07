let dao = require('./mysqlService');
let logger = require('../common/logger')('ruleDefineService');
let commonUtil = require('../common/utils/commonUtil');
let returnCode = require('../common/consts/returnCode');

module.exports = {
    getRuleNameByRuleId: function (ruleIdList, routerType) {
        let queryStr = "select bean_id from router_rule_def where rule_id in (?) and rule_type = ?";
        let paramObjs = [ruleIdList, routerType];
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
                      return result;
                  });
    }
};
