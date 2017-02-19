var strUtil = require('../../common/utils/stringUtil');
var objUtil = require('../../common/utils/objUtil');
var returnCode = require('../../common/consts/returnCode');

module.exports = {
    paramCheck4FindChannel: function (request) {
        var checkResult = {
            pass: true
        };

        if (objUtil.isEmpty(request)) {
            checkResult.pass = false;
            checkResult.returnCode = returnCode.collect.paramIsNull;
            return checkResult;
        }
        if (strUtil.isEmpty(request.accessor)) {
            checkResult.pass = false;
            checkResult.returnCode = returnCode.collect.accessorIsNull;
            return checkResult;
        }
        return checkResult;
    }
};