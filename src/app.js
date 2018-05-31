/* eslint-disable no-console,no-undef*/
import express      from 'express';
import bodyParser   from 'body-parser';
import compression  from 'compression';
import morgan       from 'morgan';
import https        from 'https';

// Config
import ApiConfig    from './config/api.conf';

// Core
import Cors         from './core/Cors';
import Routers      from './core/Routers';
import Database     from './core/Database';
import RequestQuery from './core/RequestQuery';
import SSL          from './core/SSL';
import Security     from './core/Security';
import Response     from './core/Response';

// Classes & app
const app           = express();
const config        = new ApiConfig();
const cors          = new Cors();
const routers       = new Routers();
const database      = new Database();
const requestQuery  = new RequestQuery();
const ssl           = new SSL().getCredentials();
const security      = new Security();
const response      = new Response();

// Set express app in Response class
response.setApp(app);

// Define environment object
const environment = config.getEnv();

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
};

/**
 * Console log output
 * @param text
 * @private
 */
const _appLog = (text) => {
    if (config.getEnvName() !== 'test') {
        console.log(text)
    }
};

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupCors = () => {
    environment.server.cors['x-powered-by'] = environment.app.name;
    cors.setCors(app, environment.server.cors)
};

/**
 * Set databases properties and connect
 * @private
 */
const _setupDatabase = () => {

    _setupCors();

    if (Object.keys(environment.databases).length) {
        database.connectDatabases(
            environment.databases,
            config.getEnvName() !== 'test'
        ).then(() => {
            _setupRouters();
        });
    } else {
        _appLog('[!]\t No database to connect.');
        _setupRouters();
    }
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
    _setupDatabase();
    _appLog(`\n${environment.app.name} on at ${environment.server.host}:${environment.server.port}\n`);
    if (ssl.cert && environment.server.secure) {
        _appLog('[SSL_ON]\tSecure')
    } else {
        _appLog('[SSL_OFF]\tNOT SECURE (!)')
    }
};

// No use logs in test environment!
if (config.getEnvName() !== 'test') {
    app.use(morgan(config.getEnvName() === 'development'? 'dev' : 'combined'));
}

// Express global usages and middlewares
app.use(bodyParser.json());
app.use(requestQuery.parseQuery);
app.use(compression());

// Security middlewares with helmet
security.makeSecure(app);

// Create secure server or insecure server (see your *.env.js)
const server = environment.server.secure && ssl.cert ? https.createServer(ssl, app) : app;

// Listen server
server.listen(environment.server.port, environment.server.host, _listenSuccess);

export default app;