var fs = require('fs');
var path = require('path');
var config = require('../common/config');


module.exports = {
    /*
      根据accessor，type 查找缓存中是否有对应的规则链表，有，使用，无，解析并加入缓存
     */
    assemble: function (accessor, type) {
        rules = {}

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
    }
}

}
var load = function (path, name) {
    if (name) {
        return require(path + name);
    }
    return require(path);
};
