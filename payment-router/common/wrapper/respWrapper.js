
let respDatagram = {};

module.exports={
    
    data:function (data, resp) {
        respDatagram.code = '000000';
        respDatagram.data = data;
        respDatagram.err = null;
        resp.send(respDatagram);
    },
    error:function (error, resp) {
        respDatagram.code = '999999';
        respDatagram.data = null;
        respDatagram.err = error;
        resp.send(respDatagram);
    }
};