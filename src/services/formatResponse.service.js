import json2csv from 'json2csv';
import json2xml from 'js2xmlparser';

class FormatResponse {

    /**
     * Convert base response to selected type
     * @param data
     * @param type
     * @param xmlMainField
     * @returns {{data: *, type: *}}
     */
    format(data, type, xmlMainField = 'response') {

        let formattedData   = null;
        let mimeType        = null;

        switch (type) {
            case 'json': {
                formattedData   = data;
                mimeType        = 'application/json';
                break;
            }
            case 'xml': {
                formattedData   = json2xml.parse(xmlMainField, data);
                mimeType        = 'text/xml';
                break;
            }
            case 'csv': {
                formattedData   = json2csv({data: data.track, fields: null});
                mimeType        = 'text/x-csv';
                break;
            }
            default: {
                // ????
                break;
            }
        }

        return {
            data: formattedData,
            type: mimeType
        }
    }
}

export default new FormatResponse()