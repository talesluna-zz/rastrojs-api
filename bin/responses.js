var xml_return = require("./xml_return");

/**
 * Retorna a resposta HTTP de acordo com o tipo escolhido em rota
 * @param type
 * @param data
 * @param status
 * @param res
 * @returns {*}
 */
var responses = function (type,data,status,res) {
    switch (type){
        case 'json':
            return res.status(status).json(data);
        case 'xml':
            return res.status(status)
                .send(xml_return(data,'rastreio',res));
        default:
            return res.status(status).json(data);
    }
};

module.exports = responses;