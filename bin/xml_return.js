var js2xmlparser = require("js2xmlparser");

/**
 * Transforma objetos em XML
 * @param object
 * @param main_tag
 * @param res
 * @returns {string}
 */
var transform = function (object, main_tag, res) {
    res.set('Content-Type', 'text/xml');
    return js2xmlparser.parse(
        main_tag,object
    );
};

module.exports = transform;