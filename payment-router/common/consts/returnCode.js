module.exports = {
    router: {
        configError_at_01:{code:"000101",msg: "系统配置错误-根据accessor和transType无匹配"},
        configError_at_02:{code:"000102",msg: "系统配置错误-根据accessor和transType找到多条匹配"},
        "000102": "系统配置错误-yyyy",

        "000201": "系统业务异常-hhhhh",
        "000201": "系统业务异常-lllll"
    },
    collect: {
        paramIsNull: {code: "010100", msg: "参数不全-请求参数为空"},
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