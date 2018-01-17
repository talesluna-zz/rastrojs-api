import request  from 'request-promise';
import cheerio  from 'cheerio';
import iconv    from 'iconv-lite';

class CorreiosFindObject {

    constructor() {
        this.ENDPOINTS = {
            find: 'http://www2.correios.com.br/sistemas/rastreamento/newprint.cfm'
        }
    }

    /**
     * 
     * @param {*} endpoint 
     * @param {*} method 
     * @param {*} data 
     */
    _request(endpoint, method = 'GET', data = null) {
       return request(
           {
               uri: endpoint,
               method: method,
               form: data
           }
       ).then(data => {
           return iconv.decode(Buffer.from(data), 'binary')
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

            // Procura e armazena os dado de cadas rastreio.
            // A primeira linha contém data e unidade, a segunda a situação
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
                    trackData[key] = data.replace(/\s\s+/g,'');
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
     * 
     * @param {*} objectId 
     */
    find(objectId) {
        return this._request(
            this.ENDPOINTS.find,
            'POST',
            {
                objetos: objectId
            }
        )
        .then(html => {
            return this.parser(html);
        })
        .then(track => {
            if (track.length)
                return track;

            throw new Error('Objeto não encontrado no sistema dos Correios.')
        })
        .catch(err => {
            throw err;
        })
    }
}

export default new CorreiosFindObject();