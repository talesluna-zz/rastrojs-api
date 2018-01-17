import helmet from 'helmet';
import crypto from 'crypto';

export default class Security {

    makeSecure(app) {

        // 1 Day in seconds
        const oneDay = 86400;

        // HTKP Keys
        const hpkpKeys = [
            // Like this, of example.key
            'Lvw1UdqjGriHLTwS2ScPWNhEhhc5+2LTT2CT83eXsuU=',
            'Lvw1UdqjGriHLTwS2ScPWNhEhhc5+2LTT2CT83eXsuU='
        ];

        // Require HTTPS
        app.use(helmet.hsts({
            maxAge: oneDay
        }));

        // Prevent MITM (Man in the middle attack)
        app.use(helmet.hpkp({
            maxAge: oneDay,
            sha256s: hpkpKeys
        }));

        // No referrer
        app.use(helmet.referrerPolicy({
            policy: 'same-origin'
        }));

        // Block IE download
        app.use(helmet.ieNoOpen());

        // Block iframe usage (clickjacking)
        app.use(helmet.frameguard({
            action: 'same-origin'
        }))
    }
}