let dao = require('./mysqlService');
let logger = require('../common/logger')('channelService');
let redisClient = require('../common/wrapper/redisWrapper');
let commonUtil = require('../common/utils/commonUtil');

module.exports = {
    getChannelByInstCode: function (transType, instCode) {
        let queryStr = "select * from router_channel where product_type = ? and inst_code = ? and status = 1";
        let paramObjs = [transType, instCode];

        let redisKey = 'getChannelByInstCode_' + transType + '_' + instCode;
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
    },
    getParentChannelStatus: function (parentList) {
        let queryStr = "select * from router_channel where channel_id in (?) and status = 1";
        let paramObjs = [parentList];
        let redisKey = 'getParentChannelStatus_' + JSON.stringify(parentList);
        return redisClient.get(redisKey).then(function (cacheResult) {
            if (commonUtil.isEmptyObj(cacheResult)) {
                return dao.queryList(queryStr, paramObjs)
                          .then(function (data) {
                              let result = [];
                              for (let i = 0; i < data.length; i++) {
                                  result.push(data[i].channel_id);
                              }
                              redisClient.set(redisKey, JSON.stringify(result));
                              return result;
                          });
            }
            return JSON.parse(cacheResult);
        });
    }
};

let copyField = function (row) {
    let item = {};
    item.channelId = row.channel_id;
    item.channelName = row.channel_name;
    item.channelCode = row.channel_code;
    item.channelType = row.channel_type;
    item.status = row.status;
    item.instName = row.inst_name;
    item.instCode = row.inst_code;
    item.channelCode = row.channel_code;
    item.beginTime = row.begin_time;
    item.endTime = row.end_time;
    item.channelInstCode = row.channel_inst_code;
    item.channelInstName = row.channel_inst_name;
    item.cardType = row.card_type;
    item.needContact = row.need_contact;
    item.supportPrivate = row.support_private;
    item.supportPublic = row.support_public;
    item.privateMin = row.private_min;
    item.privateMax = row.private_max;
    item.publicMin = row.public_min;
    item.publicMax = row.public_max;
    item.parent = row.inherit_channel;
    return item;
};