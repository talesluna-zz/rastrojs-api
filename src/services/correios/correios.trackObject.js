/* eslint-disable id-length */
import cheerio  from 'cheerio';
import CorreiosService from '../correios.service';

class CorreiosTrackObject extends CorreiosService {

    constructor() {
        super();
    }

    /**
     * Parse HTML width cheerio and format response
     * @param {*} html
     */
    parser(html) {
        const $         = cheerio.load(html);
        const tracks    = [];
        const domTracks = $('.listEvent').find('tr');

        domTracks
            .toArray()
            .forEach(track => {

                const trackData = [];

                // Procura e armazena os dado de cadas rastreio.
                // A primeira linha contém data e unidade, a segunda a situação
                $(track)
                    .find('td')
                    .toArray()
                    .forEach(domData => {

                        // Verifica se existe informação
                        const data = $(domData).text()
                            .replace(/[\n\r\t]/g, '')
                            .trim();

                        if (data) {
                            trackData.push(data);
                        }
                    });

                // Trata os dados presentes em cada linha da tabela
                trackData.forEach((data, trackKey) => {
                    trackData[trackKey] = trackKey === 0 ? data.split(/\s\s+/g) : data.replace(/\s\s+/g, ' ');
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
        return tracks.reverse();
    }

    /**
     * Find object on "correios" SRO
     * Parse SRO response
     * Return tracked objects
     *
     * @param {*} objectCode
     */
    track(objectCode) {
        return this._simpleRequest(this.ENDPOINTS.trackObject, 'POST', {objetos: objectCode})
            .then(html => {
                return this.parser(html);
            })
            .then(track => {
                // Not object found
                if (!track.length)
                    throw new Error('objeto não encontrado no sistema dos correios.');


                // Return found object
                return track;
            })
            .catch(err => {
                throw err;
            })
    }
}

export default new CorreiosTrackObject();