let dao = require('./mysqlService');
let logger = require('../common/logger')('channelService');

module.exports = {
    getChannelByInstCode: function (transType, instCode) {
        let queryStr = "select * from router_channel where product_type = ? and inst_code = ? and status = 1";
        let paramObjs = [transType, instCode];
        return dao.queryList(queryStr, paramObjs)
                  .then(function (data) {
                      let result = [];
                      for (let row in data) {
                          result.push(copyField(row));
                      }
                      return result;
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