var chai = require('chai');
var should = chai.should();
var ruleEngine = require('../core/ruleEngine');

describe('rule engine', function () {
    it('should parse all rule name.', function () {
        return result = ruleEngine.fire({}).then(function (data) {
            return data;
        });
    })
});

