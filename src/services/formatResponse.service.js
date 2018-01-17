import json2csv     from 'json2csv';
import js2xmlparser from 'js2xmlparser';

class FormatResponse {
    constructor() {}

    format(data, type) {

        let formatedData    = null;
        let mimeType        = null;

        switch (type) {
            case 'json': {
                formatedData    = data;
                mimeType        = 'application/json';
                break;
            }
            case 'xml': {
                formatedData    = js2xmlparser.parse('track', data);
                mimeType        = 'text/xml';
                break;
            }
            case 'csv': {
                formatedData    = json2csv({data: data, fields: null});
                mimeType        = 'text/x-csv';
                break;
            }
            default: {
                // ????
                break;
            }
        }

        return {
            data: formatedData,
            type: mimeType
        }
    }
}

export default new FormatResponse()