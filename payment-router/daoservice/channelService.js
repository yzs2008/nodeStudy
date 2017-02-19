var dao = require('./mysqlService');
var Q = require('q');

module.exports = {
    getChannelByInstCode: function (transType, instCode) {
        var queryStr = "select * from router_channel where product_type = ? and inst_code = ? and status = 1";
        var paramObjs = [transType, instCode];
        return dao.queryList(queryStr, paramObjs)
                  .then(function (data) {
                      return data;
                  })
                  .fail(function (err) {
                      return null;
                  });

    }
};
