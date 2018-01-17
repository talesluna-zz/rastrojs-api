/**
 * Use this class for all methods that synchronize and set routes for express app
 */
import path     from 'path';
import fs       from 'fs'

export default class Routers {

    syncRouters(app) {
        fs.readdirSync(path.join(__dirname, '../api'))
            .forEach((module) => {
                require(path.join(__dirname, `../api/${module}/_index`)).default(app);
            });

        /**
         * Route Not Found Error
         */
        app.get('*', function(req, res){
            res.api.send(null, res.api.codes.NOT_FOUND, 'route_not_found');
        });

        /**
         * Handle any others Errors
         */
        app.use((err, req, res, next) => {
            if (err) {
                console.log(err)
                res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
            }
            next();
        });

        /**
         * Emit app started completely
         */
        app.emit('app_started');
    }
}