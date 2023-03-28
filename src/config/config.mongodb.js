'use strict'
const localhost = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT_DB || 27017,
        name: process.env.DB_NAME || 'shopDEV',
    }
}

const production = {
    app: {
        port: process.env.PORT || 3000 
    },
    db: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT_DB || 27017,
        name: process.env.DB_NAME || 'shopPRO',
    }
}
const config = {localhost, production};
const env = process.env.NODE_ENV;
module.exports = config[env];