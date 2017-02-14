var router = require('express').Router();
var ruleEngine = require('../core/ruleEngine');
var service = require('./appservice/collectService');
var logger = require('../common/logger')('collect');

router.post('/find/channel', function (req, res) {
    //param check
    if(service.paramCheck(req)){
        res.send('param check failed');
    }
    return ruleEngine.fire(req).then(function (data) {
        logger.info(data);
        res.send(data);
    }).fail(function (err) {
        logger.info(err);
        res.send(err);
    });

});

module.exports = router;
