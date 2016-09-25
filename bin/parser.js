
var request         = require("request");
var HTTPStatus      = require('http-status-codes');
var striptags       = require('striptags');
var iconv           = require('iconv-lite');
var js2xmlparser    = require("js2xmlparser");


var parser = function (req, res) {

    var websro_url = "http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_COD_UNI="+req.params.code;

    var result = [];

    request({
        uri     : websro_url,
        method  : "GET",
        timeout : 10000,
        encoding: 'binary'
    }, function(error, response, data) {

        if(error){
            return res.status(HTTPStatus.REQUEST_TIMEOUT).send();
        }

        // Apenas para unir os dados de encaminhamento
        var encaminhados = 0;
        var posicao      = 0;

        // A página dos correios está nessa codificação, se alterar terá problemas abaixo
        data = iconv.decode(data, 'windows-1252');

        // O mesmo esquema de sempre
        data = striptags(data,'<td>');
        data = data.replace(/<td>/g,',');
        data = data.split('Situação')[1];

        // Se já não há nada aqui, não existem dados de rastreio a apresentar
        if(!data){
            return res.status(HTTPStatus.NOT_FOUND).json({
                status  : false,
                code    : HTTPStatus.NOT_FOUND,
                message : 'Não foram encontrados dados para o código '+req.params.code
            });
        }

        data = data.split('SRO Mobile')[0];
        data = striptags(data, '</td>');
        data = data.split('\n');

        // Varrendo linha por linha para formar nosso obj
        data.forEach(function (line) {
           if(line){

               // Split no CSV fake feito no esquema
               var csv = line.split(',');

               // Se for encaminhamento, trocar valor pela informação de para onde foi encaminhado
               if(csv[2] == "Encaminhado"){
                   encaminhados++;
                   csv[2] = data[posicao+1];
               }

               if(csv.length == 3){
                   var values = {
                       data     : csv[0],
                       local    : csv[1],
                       situacao : csv[2]
                   };

                   result.push(values);
               }

           }
           posicao++;
        });

        // Responder de acordo com o tipo escolhido
        switch (req.params.type){
            case 'xml':
                res.set('Content-Type', 'text/xml');
                return res.status(HTTPStatus.OK).send(js2xmlparser.parse('rastreio', result.reverse()));
                break;
            case 'json':
                return res.status(HTTPStatus.OK).json(result.reverse());
                break;
            default:
                return res.status(HTTPStatus.BAD_REQUEST).json({
                    status  : false,
                    code    : HTTPStatus.BAD_REQUEST,
                    message : 'Respostas em '+req.params.type+' não foram implementadas'
                });
                break;
        }

    });


};

module.exports = parser;