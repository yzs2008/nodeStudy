module.exports = {
    router: {
        configError_at_01:{code:"000101",msg: "系统配置错误-根据accessor和transType无匹配"},
        configError_at_02:{code:"000102",msg: "系统配置错误-根据accessor和transType找到多条匹配"},
        configError_at_03:{code:"000103",msg: "系统配置错误-规则名称无匹配"},
        configError_at_04:{code:"000104",msg: "系统配置错误-未能成功加载全部规则"},
        configError_at_05:{code:"000105",msg: "系统配置错误-规则链为空"},
        "000102": "系统配置错误-yyyy",

        no_router_found_at_channel:{code:"009901",msg: "路由结果为空--无可用渠道"},
        no_router_found_at_parent_channel:{code:"009902",msg: "路由结果为空--父渠道已关闭"},
        no_router_found_at_quota:{code:"009910",msg: "路由结果为空--金额范围无匹配"},
        no_router_found_at_fund:{code:"009910",msg: "路由结果为空--无渠道匹配资金源"}
    },
    collect: {
        paramIsNull: {code: "010100", msg: "参数不全-请求参数为空"},
        accessorIsNull: {code: "010101", msg: "参数不全-accessor字段值为空"},
        accessorIsNull: {code: "010101", msg: "参数不全-accessor字段值为空"},
        "010102": "参数不全-routerType字段值为空",

        "010201": "参数错误-accessor字段值不能识别",
        "010201": "参数错误-routerType字段值不能识别"
    },
    sign: {
        "020101": "参数不全-accessor字段值为空",
        "020102": "参数不全-routerType字段值为空",

        "020201": "参数错误-accessor字段值不能识别",
        "020201": "参数错误-routerType字段值不能识别"
    },
    withdraw: {
        "030101": "参数不全-accessor字段值为空",
        "030102": "参数不全-routerType字段值为空",

        "030201": "参数错误-accessor字段值不能识别",
        "030201": "参数错误-routerType字段值不能识别"
    }
};