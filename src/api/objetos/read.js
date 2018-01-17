import CorreiosService  from '../../services/correios.service';
import FormatResponse   from '../../services/formatResponse.service';

export default (req, res) => {

    /**
     * Find object in correios.com.br
     */
    CorreiosService.findObject(req.params._objectsId)
    .then(track => {

        // Case requested response type is json use default api structure for responses
        if (req.params._outputType === 'json')
            return res.api.send(track, res.api.codes.OK);

        // Others use simple express response

        // Format response in requested type
        const response = FormatResponse.format(track, req.params._outputType);

        res.set('content-type', response.type);
        return res.status(res.api.codes.OK.code).send(response.data)

    })
    .catch(err => {

        // Same for errors
        if (req.params._outputType === 'json')
            return res.api.send(err.message, res.api.codes.NOT_FOUND);

        const response = FormatResponse.format(err, req.params._outputType);

        res.set('content-type', response.type);
        return res.status(res.api.codes.NOT_FOUND.code).send(response.data)
    });
}