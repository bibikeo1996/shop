'use strict'
const mongoose = require('mongoose');
const {
    db: {
        host,
        name,
        port
    }
} = require('../config/config.mongodb');
const connectString = `mongodb://${host}:${port}/${name}`;

console.log(`Connecting to:: ` + connectString);

class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        //Dev
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', {
                color: true
            });
        }
        mongoose.connect(connectString, {
                maxPoolSize: 50
            }).then(_ => {
                console.log(`Connected Mongodb`);
            })
            .catch(err => console.log(`Error Connect!: ` + err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;