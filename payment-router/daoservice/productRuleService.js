var dao = require('./mysqlService');
var logger = require('../common/logger');

module.exports = {
    getRuleContentByAccessor: function (accessor, routerType) {
        var queryStr = "select pre_rule_content,priority_rule_content,end_rule_content from router_product_rule_info where product_no = ? and trans_type = ?";
        var paramObjs = [accessor, routerType];
        return dao.queryList(queryStr, paramObjs)
                  .then(function (data) {
                      return data[0];
                  })
                  .fail(function (err) {
                      return null;
                      logger.info('获取路由策略配置信息出错', err);
                  });
    }
};
