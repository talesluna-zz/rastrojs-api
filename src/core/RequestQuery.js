class RequestQuery {

    // Middleware to parse
    parseQuery (req, res, next) {

        // Parse select fields
        // Usage: ?select=field1,field2
        if ('select' in req.query) {
            req.query.select = req.query.select.split(',');
            req.query.project = {};
            req.query.select.forEach(item => {
                req.query.project[item] = true
            });
        }

        // Parse where fields
        // Usage: ?where={"field1":"value", "field2": "value"}
        req.query.where = 'where' in req.query ? JSON.parse(req.query.where) : {};

        // Parse offset
        // Usage: ?offset=10
        req.query.offset = 'offset' in req.query ? parseInt(req.query.offset, Infinity) : 0;

        // Parse limit
        // Usage: ?limit=10 (OBS: default is 2^63-6, BIGINT max value calculate)
        req.query.limit = 'limit' in req.query ? parseInt(req.query.limit, Infinity) : Math.pow(2, 63-6);
        next()
    }
}

export default RequestQuery