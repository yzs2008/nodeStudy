let commonUtil = require('../../common/utils/commonUtil');
let returnCode = require('../../common/consts/returnCode');

module.exports = {
    paramCheck4FindChannel: function (request) {
        let checkResult = {
            pass: true
        };

        if (commonUtil.isEmptyObj(request)) {
            checkResult.pass = false;
            checkResult.returnCode = returnCode.collect.paramIsNull;
            return checkResult;
        }
        if (commonUtil.isEmptyStr(request.accessor)) {
            checkResult.pass = false;
            checkResult.returnCode = returnCode.collect.accessorIsNull;
            return checkResult;
        }
        return checkResult;
    }
};