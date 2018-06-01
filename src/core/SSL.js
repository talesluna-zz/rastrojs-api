import fs from 'fs';
import path from 'path';

export default class SSL {
    constructor () {

        /**
         * File of private key and certificate
         * @type {{privateKey: (string|*), certificate: (string|*)}}
         */
        this.files = {
            privateKey  : path.join(__dirname, '../storage/certificates/ssl.key'),
            certificate : path.join(__dirname, '../storage/certificates/ssl.crt')
        };

        /**
         * THis object is a ssl options for http server
         * @type {{key: *, cert: *, requestCert: boolean, rejectUnauthorized: boolean}}
         */
        this.credentials = {
            key: this._readCertAndKey(this.files.privateKey),
            cert: this._readCertAndKey(this.files.certificate),
            requestCert: true,
            rejectUnauthorized: false
        };
    }

    /**
     * Read private key and certificate files
     * @param file
     * @returns {any}
     * @private
     */
    _readCertAndKey(file) {
        return fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : null;
    }

    /**
     * Return created ssl options
     * @returns {{key: *, cert: *, requestCert: boolean, rejectUnauthorized: boolean}}
     */
    getCredentials() {
        return this.credentials;
    }
}