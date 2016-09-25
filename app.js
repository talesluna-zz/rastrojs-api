
/*
    @name       Rastro - API Rastreamendo de objetos - Correios - NodeJS
    @author     Tales Luna <tale.ferreira.luna@gmail.com>

    Meio alternativo ao WebService dos correios para consultar rastreio de objetos
    com retorno em XML e JSON

    (Esta API também está disponível em PHP no meu GitHub)

 */

var express     = require('express');
var configs     = require('./configs/config');
var parser      = require('./bin/parser');
var HTTPStatus  = require('http-status-codes');

var app = express();

// Headers simples
app.use(function (req, res, next) {
    res.header('x-powered-by', configs.app_name+" - "+configs.app_version);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', configs.app_origin);
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});


/* Rotas */

// Padrão
app.get("/", function (req, res) {
    return res.status(HTTPStatus.OK).json({
        status  : true,
        code    : HTTPStatus.OK,
        message : configs.app_name+" - "+configs.app_version
    });
});


// Caso o usuário tenha esquecido de informar o código
app.get("/:type/", function (req, res) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
        status  : true,
        code    : HTTPStatus.BAD_REQUEST,
        message : 'informe um código de rastreio (EX:SS123456789BR)'
    });
});


// Caso todos os dados necessários esteja presente
app.get('/:type/:code', parser);

module.exports = app;