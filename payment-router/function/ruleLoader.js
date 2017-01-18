var fs = require('fs');
var path = require('path');
var config = require('../common/config');

var ruleCollection = {};
/**
 *
 * ruleCollection ={
 *      pre:{
 *          name:ruleObject
 *      },
 *      post:{},
 *      priority:{}
 * }
 *
 */

module.exports = {

    /**
     * 先从缓存中加载， 若找不到，则根据type到具体的目录下加载，如果找不到，抛出规则不存在异常
     * 若找到，则加入缓存
     * @param ruleName
     * @param type
     * @returns {*}
     */
    load: function (ruleName, type) {

        var dir = config.rulePath;
        fs.readdirSync(__dirname + '/' + dir).forEach(function (fileName) {
            if (!/\.js$/.test(fileName)) {
                return;
            }
            var name = path.basename(fileName, '.js');
            var _load = load.bind(null, './' + dir + '/', name);

            rules[name] = _load;
        });

        return rules;
    },
    init: function () {
        //加载所所有的规则
    },
    reload:function () {
        //重新加载所有规则
    }

}
var loadFile = function (path, name) {
    if (name) {
        return require(path + name);
    }
    return require(path);
};
