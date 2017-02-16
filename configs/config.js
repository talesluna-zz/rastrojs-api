/*
    @name       Rastro - API Rastreamendo de objetos - Correios
    @author     Tales Luna <tale.ferreira.luna@gmail.com>

    Configurações básicas da API
 */
var configs = function() {
    return  {
        app_port    : '3000',
        app_host    : '127.0.0.1',
        app_name    : 'Rastro - API Rastreamento de objetos - Correios',
        app_version : 'v1.0.2',
        app_origin  : '*'
    };
};

module.exports = configs();