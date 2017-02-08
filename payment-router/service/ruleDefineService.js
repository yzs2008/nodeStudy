var dao = require('./mysqlService');
var logger = require('../common/logger')('ruleDefineService');

module.exports = {
    getRuleNameByRuleId: function (ruleIdList, routerType) {
        var queryStr = "select bean_id from router_rule_def where rule_id in (?) and rule_type = ?";
        var paramObjs = [ruleIdList, routerType];
        return dao.queryList(queryStr, paramObjs).then(function (data) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                result[i] = data[i]['bean_id'];
            }
            return result;
        }).fail(function (err) {
            return [];
            logger.info(err);
        });
    }
};
