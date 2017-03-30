let dao = require('./mysqlService');
let logger = require('../common/logger')('channelService');
let redisClient = require('../common/wrapper/redisWrapper');
let commonUtil = require('../common/utils/commonUtil');

module.exports = {
    getChannelByFund: function (fund, parentChannelList) {
        let queryStr = "select * from router_fund_relation where fund_id = ? and channel_id in (?)";
        let paramObjs = [fund, parentChannelList];

        let redisKey = 'getChannelByFund_' + fund + '_' + JSON.stringify(parentChannelList);
        return redisClient.get(redisKey).then(function (cacheResult) {
            if (commonUtil.isEmptyObj(cacheResult)) {
                return dao.queryList(queryStr, paramObjs)
                          .then(function (data) {
                              let result = [];
                              for (let i = 0; i < data.length; i++) {
                                  result.push(copyField(data[i]));
                              }
                              logger.info('cache missed.');
                              redisClient.set(redisKey, JSON.stringify(result));
                              return result;
                          });
            }
            logger.info('cache hited.');
            return JSON.parse(cacheResult);
        });
    }
};

let copyField = function (row) {
    let item = {};
    item.channel = row.channel_id;
    item.fund = row.fund_id;
    item.productType = row.product_type;
    item.account = row.account_no;
    item.status = row.status;
    item.business = row.business;
    item.remark = row.remark;
    item.creator = row.creator;
    return item;
};