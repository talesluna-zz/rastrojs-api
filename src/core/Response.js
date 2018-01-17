/**
 * This class make a express centralized response method
 * this method is: res.api.send, injected in express response
 * and can be used in any middlewares
 */
let expressRes = null;

class Response {

    constructor() {
        this._createConstants();
    }

    /**
     * Inject the send method in Express
     * Inject response codes in
     */
    setApp(app) {
        app.use((req, res, next) => {

            expressRes = res;
            res.api = {
                send: Response.send,
                codes: this.codes
            };
            next()
        })
    }

    /**
     * Use express an send HTTP response in JSON
     * @param data
     * @param ResponseType
     * @param customMessage
     */
    static send(data, ResponseType, customMessage = null) {
        return expressRes.status(ResponseType.code).json(
            {
                code    : ResponseType.code,
                data    : data,
                message : customMessage ? customMessage : ResponseType.message
            }
        );
    }

    /**
     * Response constants, using HTTP patterns
     * @private
     */
    _createConstants() {
        this.codes = {
            BAD_REQUEST: {
                code: 400,
                message: 'bad_request'
            },
            CREATED: {
                code: 201,
                message: 'created'
            },
            NOT_FOUND: {
                code: 404,
                message: 'not_found'
            },
            INTERNAL_SERVER_ERROR: {
                code: 500,
                message: 'internal_server_error'
            },
            FOUND: {
                code: 302,
                message: 'found'
            },
            OK: {
                code: 200,
                message: 'success'
            }
        }
    }
}

export default Response;