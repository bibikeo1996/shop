'use strict'
const localhost = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.DEV_APP_HOST || '127.0.0.1',
        port: process.env.DEV_APP_PORT_DB || 27017,
        name: process.env.DEV_APP_DB_NAME || 'shopDEV',
    }
}

const production = {
    app: {
        port: process.env.PORT || 3000 
    },
    db: {
        host: process.env.PRODUCT_APP_HOST || '127.0.0.1',
        port: process.env.PRODUCT_APP_PORT_DB || 27017,
        name: process.env.PRODUCT_APP_DB_NAME || 'shopPRO',
    }
}
const config = {localhost, production};
const env = process.env.NODE_ENV;
console.log(config[env]);
module.exports = config[env];