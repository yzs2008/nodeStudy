module.exports = {
    routerType: {
        cop: "COP",
        sign: "SIGN",
        withdraw: "WDC"
    },

    routerCode: {
        cop: "0901",
        sign: "0501",
        withdraw: "0701"
    },

    ruleType: {
        precondition: "precondition",
        priority: "priority",
        postcondition: "postcondition"
    },

    ruleTypeConverter: function (ruleType) {
       if(ruleType == 'precondition'){
           return "pre_rule_content";
       }else if(ruleType == 'postcondition'){
           return "end_rule_content";
       }else if(ruleType == 'priority'){
           return "priority_rule_content";
       }else {
           return null;
       }
    }

};

