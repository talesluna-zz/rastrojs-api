import Service from './service';
import request from 'request-promise';
import iconv from 'iconv-lite';

export default class CorreiosService extends Service {


    constructor() {

        super();

        // Configure endpoints
        this.ENDPOINTS = {
            trackObject: 'https://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm'
        };

    }


    /**
     * Build HTTP request to endpoints
     * @param {*} endpoint
     * @param {*} method
     * @param {*} data
     */
    _simpleRequest(endpoint, method = 'GET', data = null) {

        return request(
                {
                    uri         : endpoint,
                    form        : data,
                    gzip        : true,
                    method      : method,
                    encoding    : null,
                    strictSSL   : false
                }
            )
            .then(response => {

                return iconv.decode(Buffer.from(response), 'binary')
            });
    }

}