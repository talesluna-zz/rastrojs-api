var requestPromise  = require("request-promise");
var cheerio         = require("cheerio");

/**
 * @type {{request: WebSRO.request, parser: WebSRO.parser}}
 */
var WebSRO = {

    /**
     * Promise da request ao WebSRO
     * @param req
     */
    request: function (req) {
        var correios = {
            uri: "http://www2.correios.com.br/sistemas/rastreamento/multResultado.cfm",
            form: {
                objetos: req.params.code
            },
            method: 'POST',
            headers: {}
        };
        return requestPromise(correios);
    },

    /**
     *  Realiza parser da informação retornada do request
     * @param data
     */
    parser: function (data) {
        var $ = cheerio.load(data);
        var objetos = [];
        var tableObjetos = $('table').find('tr');
        $(tableObjetos).map(function(key, objeto){
            objeto  = $(objeto).children('td').map(function (key, field) {
                return $(field).text();
            }).toArray();
            if (objeto[0]) {

                var rastreio = {
                    codigo  : null,
                    situacao: null,
                    local   : null,
                    data    : null
                };

                rastreio.codigo     = objeto[0].trim();
                if (objeto[2]) {
                    rastreio.situacao   = objeto[1];
                    rastreio.local      = objeto[2].substr(11, objeto[2].length).trim();
                    rastreio.data       = objeto[2].substr(0,10).trim();
                } else {
                    rastreio.situacao   = 'Objeto ainda não consta no sistema'
                }

                objetos[rastreio.codigo] = rastreio;
            }
        });

        return Object.assign({}, objetos);
    }

};

module.exports = WebSRO;