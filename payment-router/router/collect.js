var router = require('express').Router();
var ruleEngine = require('../core/ruleEngine');
var service = require('./appservice/collectService');
var logger = require('../common/logger')('collect');
var respWrapper = require('../common/wrapper/respWrapper');

router.post('/find/channel', function (req, res) {
    //param check
    var checkResult = service.paramCheck4FindChannel(req.body);
    if (!checkResult.pass) {
        respWrapper.error(checkResult.returnCode, res);
    }

    return ruleEngine.fire(req.body)
                     .then(function (data) {
                         respWrapper.data(data, res);
                     })
                     .fail(function (err) {
                         logger.error(err.message);
                         respWrapper.error(err.message, res);
                     });

});

module.exports = router;
