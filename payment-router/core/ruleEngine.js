var fs = require('fs');
var path = require('path');
var config = require('../common/config');


module.exports = {
    /*
     根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
     */
    assemble: function (accessor, type) {
        rules = {}
        return rules;
    },
    execute: function (filter) {

    }
}

var load = function (path, name) {
    if (name) {
        return require(path + name);
    }
    return require(path);
};
