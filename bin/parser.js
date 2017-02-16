var requestPromise  = require("request-promise");
var HTTPStatus      = require('http-status-codes');
var striptags       = require('striptags');

/**
 * @type {{request: WebSRO.request, parser: WebSRO.parser}}
 */
var WebSRO = {

    /**
     * Promise da request ao WebSRO
     * @param req
     */
    request: function (req) {
        var url = "http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_COD_UNI=" + req.params.code;
        return requestPromise(url, {encoding: 'binary'});
    },

    /**
     * Realize parser da informação retornada do request
     * @param data
     * @returns {Array.<*>}
     */
    parser: function (data) {

        /* Apenas para controle dos encaminhamentos */
        var encaminhados    = 0;
        var rastreio          = [];
        var posicao         = 0;

        /* charset presente na página dos correios */


        /* Parse da table html no site dos correios */
        data = striptags(data, '<td>');
        data = data.replace(/<td>/g, ',');
        data = data.split('Situação')[1];

        /* Se não existir dados de rastreio para o código inormado, pare por aqui... */
        if (!data)
            throw {
                statusCode: HTTPStatus.BAD_REQUEST,
                customMessage: 'Código de rastreio inválido.'
            };

        data = data.split('SRO Mobile')[0];
        data = striptags(data, '</td>');
        data = data.split('\n');

        /**
         * Realizar leitura, linha por linha
         * e retirar as informações presentes.
         */
        data.forEach(function (line) {
            if (line) {

                // Split no CSV fake feito no esquema
                var csv = line.split(',');

                // Se for encaminhamento, trocar valor pela informação de para onde foi encaminhado
                if (csv[2] == "Encaminhado") {
                    encaminhados++;
                    csv[2] = data[posicao + 1];
                }

                if (csv.length == 3) {
                    var values = {
                        data: csv[0],
                        local: csv[1],
                        situacao: csv[2]
                    };

                    rastreio.push(values);
                }

            }
            posicao++;
        });
        return rastreio.reverse();
    }

};

module.exports = WebSRO;