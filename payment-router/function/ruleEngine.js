var fs = require('fs');
var path = require('path');
var mysqlClient = require('../common/service/mysql');
var logger = require('../common/logger');

var loadProductRule = function (accessor) {
    logger.info("start to load rule collection by accessor.");
    
    var promise = mysqlClient.queryList('select * from router_product_rule_info where product_no = ?', [accessor]);
    promise.then(function (data) {
        for(var i = 0; i< data.length; i++){
            logger.info(data[i]);
        }
    }).fail(function (err) {
        logger.error(err);
    });
};

module.exports = function () {
    loadProductRule('default','cop','pub');
}
