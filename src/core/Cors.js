/**
 * Use this class for all methods that manage cors and headers
 */
export default class Cors {
    setCors(app, cors) {
        Object.keys(cors).forEach((header) => {
            app.use((req, res, next) => {
                res.header(header, cors[header]);
                next();
            })
        });
    }
}