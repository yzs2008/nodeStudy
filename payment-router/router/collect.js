let router = require('express').Router();
let ruleEngine = require('../core/ruleEngine');
let service = require('./appservice/collectService');
let logger = require('../common/logger')('collect');
let respWrapper = require('../common/wrapper/respWrapper');

router.post('/find/channel', function (req, res) {
    //param check
    let checkResult = service.paramCheck4FindChannel(req.body);
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
