let dao = require('./mysqlService');
let logger = require('../common/logger')('productRuleService');
let commonUtil = require('../common/utils/commonUtil');
let returnCode = require('../common/consts/returnCode');

module.exports = {
    getRuleContentByAccessor: function (accessor, transType) {
        var queryStr = "select pre_rule_content,priority_rule_content,end_rule_content from router_product_rule_info where product_no = ? and trans_type = ?";
        var paramObjs = [accessor, transType];
        return dao.queryList(queryStr, paramObjs)
                  .then(function (data) {
                      if (commonUtil.isEmptyArray(data)) {
                          logger.error('获取路由策略配置信息出错', returnCode.router.configError_at_01);
                          throw returnCode.router.configError_at_01;
                      }
                      if (data.length > 1) {
                          logger.error('获取路由策略配置信息出错', returnCode.router.configError_at_02);
                          throw returnCode.router.configError_at_02;
                      }
                      let rawData = data[0];
                      let result = {
                          priority:rawData.priority_rule_content,
                          precondition:rawData.pre_rule_content,
                          postcondition:rawData.end_rule_content
                      };
                      return result;
                  });
    }
};
