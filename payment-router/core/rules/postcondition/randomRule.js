let logger = require('../../../common/logger')('randomRule');
let random = require('random-js')();

module.exports = function (request, routerInfo) {
    logger.info('execute randomRule.');
    let result = {};
    if (routerInfo.length == 1) {
        result = routerInfo[0];
    } else {
        result = randomResult(routerInfo);
    }
    return result;
};

let randomResult = function (routerInfo) {
    let index = random.integer(1, routerInfo.length) - 1;
    return routerInfo[index];
};
