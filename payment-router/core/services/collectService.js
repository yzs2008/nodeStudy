var engine = require('../ruleEngine');


module.exports = {
    getRouterInfo: function (filter) {
        engine.execute(filter);
    }
};