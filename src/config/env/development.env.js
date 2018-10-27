module.exports = {
    app: {
        name: 'Rastro - API Rastreamendo de objetos - Correios',
        version: '2.0.0'
    },
    server: {
        secure: true,
        host: '0.0.0.0',
        port: process.env.NODE_PORT | 3000,
        cors: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
    },
    databases: {

        // MongoDB with support a cluster
        mongodb: {
            servers: [
                {
                    host: 'localhost',
                    port: 27017
                }
            ],
            replicaSet  : 'Cluster0-shard-0',
            authSource  : 'admin',
            ssl         : true,
            user        : 'myuser',
            pass        : 'mypass',
            name        : 'myuser',
            dialect     : 'mongodb',
            charset     : 'utf8',
            logging     : true,
            enabled     : false,
            configWith  : 'mongoose'
        }
    }
};