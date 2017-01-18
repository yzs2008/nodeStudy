var fs = require('fs');
var path = require('path');
var config = require('../common/config');

var load = function(path, name) {
    return require(path);
};

module.exports = function () {
    rules = {}

    var dir = config.rulePath;
    fs.readdirSync(__dirname + '/' + dir).forEach(function (fileName) {
        if (!/\.js$/.test(fileName)) {
            return;
        }
        var name = path.basename(fileName, '.js');
        var _load = load('./' + dir + '/' + name);

        rules[name] = _load;
    });

    return rules;
}
