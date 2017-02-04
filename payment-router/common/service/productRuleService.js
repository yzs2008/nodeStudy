var dao = require('./mysqlService');
var Q = require('q');

module.exports = {
    getRuleContentByAccessor: function (accessor, routerType) {
        var queryStr = "select * from router_product_rule_info where product_no = ? and trans_type = ?";
        var paramObjs = [accessor,routerType];
       return dao.queryList(queryStr, paramObjs);
    }
};
