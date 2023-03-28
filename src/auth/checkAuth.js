'use strict'

const { findByID } = require("../services/apiKey.services");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if(!key){
            return res.status(403).json({
                message: 'Forbidden error (checkAuth File)'
            });
        }

        // check objKey
        const objKey = await findByID(key);
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden error (checkAuth File 2)'
            });
        }

        req.objKey = objKey;
        return next();

    } catch (error) {
        console.error(error);
    }
}

const permission = ( pms ) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: "Permission denied (checkAuth file)"
            });
        }
        const validPermission = req.objKey.permissions.includes(pms)
        if(!validPermission){
            return res.status(403).json({
                message: "Permission denied (checkAuth file)"
            });
        }

        return next();
    }
}

module.exports = {
    apiKey,
    permission
}