'use strict'
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

// Count connection
const countConnect = () => {
    const numConnnection = mongoose.connections.length;
    console.log(`Number of connections::${numConnnection}`);
}

//check overload connection
const checkOverLoad = () => {
    setInterval( () => {
        const numConnnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = (numCores*5)-10;
        /*Should be set limit around < 10 unit then when the 
        connect overload will have time for Admin to check and have a solution
        */

        console.log(`Active connections:: ${numConnnection}`);
        console.log(`Memory usage:: ${memoryUsage/1024/1024} MB`);

        if(numConnnection > maxConnections){
            console.log("Connections overload detected");
        }
    }, _SECOND) // Monitor every 5s
}

module.exports = { 
    countConnect,
    checkOverLoad
};