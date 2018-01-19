import Joi from 'joi';

export default (req, res, next) => {

    const outputTypesList = [
        'json',
        'xml',
        'csv'
    ];

    Joi
        .object(
            {
                _trackId: Joi.string().length(13),
                _outputType: Joi.string().valid(outputTypesList)
            }
        )
        .validate(req.params, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.BAD_REQUEST);

            next();
        });
}