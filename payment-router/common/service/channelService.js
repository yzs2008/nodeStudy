var dao = require('./mysql');
var Q = require('q');

module.exports = {
    getChannelByInstCode: function (channelType, instCode) {
        var queryStr = "select * from router_channel where channel_type = ? and inst_code = ? and status = 1";
        var paramObjs = [channelType,instCode];
        dao.queryList(queryStr, paramObjs)
            .then(function (data) {
                return data;         
            }).fail(function (err) {
                return null; 
        });
        
    }
};
