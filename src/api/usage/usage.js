import path from 'path';

const getUsageUrl = (url, outputType) => {
    return path.join(url, '/track/:_objectCode/', outputType);
}

export default (req, res) => {

    return res.api.send({
        app: 'RastroJS',
        version: '2.6.0',
        routes: {
            json: `GET ${getUsageUrl(req.originalUrl, 'json')}`,
            xml: `GET ${getUsageUrl(req.originalUrl, 'xml')}`,
            csv: `GET ${getUsageUrl(req.originalUrl, 'csv')}`
        }
    }, res.api.codes.OK);
}

