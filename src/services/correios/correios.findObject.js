import request  from 'request-promise';
import cheerio  from 'cheerio';
import legacy from 'legacy-encoding';
import windows1252 from 'windows-1252';

class CorreiosFindObject {

    constructor() {
        this.ENDPOINTS = {
            find: 'http://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm'
        }
    }

    /**
     * Build HTTP request to SRO
     * @param {*} endpoint 
     * @param {*} method 
     * @param {*} data 
     */
    _request(endpoint, method = 'GET', data = null) {
       return request(
           {
               uri      : endpoint,
               form     : data,
               method   : method
           }
       ).then(data => {
           return legacy.decode(data, 'windows-1252')
               .toString('utf-8')
               .replace(/ýýo/g, 'ção')
               .replace(/gýn/g, 'gên')
               .replace(/týr/g, 'tár');
       })
    }

    /**
     * 
     * @param {*} html 
     */
    parser(html) {
        const $         = cheerio.load(html);
        const tracks    = [];
        const domTracks = $('.listEvent').find('tr');

        domTracks.map(function (key, track) {

            let trackData = [];

            // Procura e armazena os dado de cada rastreio.
            // A primeira linha contém data e unidade e a segunda a situação da postagem
            $(track).find('td').map(function (key, domData) {
                const data = $(domData).text().replace(/\n|\r|\t/g, '').trim();
                if (data) {
                    trackData.push(data);
                }
            });

            // Trata os dados presentes em cada linha da tabela
            trackData.forEach(function (data, key) {
                if (key === 0) {
                    trackData[key] = data.split(/\s\s+/g);
                } else {
                    trackData[key] = data.replace(/\s\s+/g, ' ');
                }
            });

            // Armazena os dados finais do rastreito na lista
            tracks.push(
                {
                    status  : trackData[1].toLowerCase(),
                    date    : trackData[0][0],
                    hour    : trackData[0][1],
                    unit    : trackData[0][2].toUpperCase()
                }
            )
        });

        // Retorna a lista de rastreios
        return tracks;
    }

    /**
     * Find object on "correios" SRO
     * Parse SRO response
     * Return tracked objects
     *
     * @param {*} objectCode
     */
    find(objectCode) {
        return this._request(this.ENDPOINTS.find, 'POST', {objetos: objectCode})
            .then(html => {
                return this.parser(html);
            })
            .then(track => {

                // Not object found
                if (!track.length)
                    throw new Error('Objeto não encontrado no sistema dos Correios.');


                // Return found object
                return track;

            })
            .catch(err => {
                throw err;
            })
    }
}

export default new CorreiosFindObject();