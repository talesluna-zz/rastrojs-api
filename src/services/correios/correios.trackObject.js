/* eslint-disable id-length */
import cheerio          from 'cheerio';
import moment           from 'moment';
import CorreiosService  from '../correios.service';

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
                    trackData[trackKey] = data.split(/\s\s+/g);
                });

                // Armazena os dados finais do rastreito na lista
                tracks.push(
                    {
                        status          : trackData[1][0] + ' ' + (trackData[1][1] ? trackData[1][1] : '')+ ' ' + (trackData[1][2] ? trackData[1][2] : ''),
                        observation     : trackData[1][1] ? trackData[1][1].toLowerCase() : null,
                        trackedAt       : trackData[0][0].toLowerCase() + ' ' + trackData[0][1].toLowerCase(),
                        unit            : trackData[0][2].toLowerCase()
                    }
                )
        });

        if (!tracks.length) {
            return null;
        }

        // Reorder tracks
        tracks.reverse();

        // Detect first and last tracks
        const [firstTrack]  = tracks;
        const lastTrack     = tracks[tracks.length-1];

        // Retorna a lista de rastreios
        return {
            isDelivered : lastTrack.status.includes('objeto entregue'),
            postedAt    : firstTrack.trackedAt,
            updatedAt   : lastTrack.trackedAt,
            track       : tracks
        };
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
            .then(objectTracking => {
                // Not object found
                if (!objectTracking || !objectTracking.track.length)
                    throw new Error('objeto não encontrado no sistema dos correios.');


                // Return found object
                return objectTracking;

            })
            .catch(err => {
                throw err;
            })
    }
}

export default new CorreiosTrackObject();
