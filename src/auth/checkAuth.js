'use strict'
const { BadRequestError } = require("../core/error.response");
// Check API authorize 
const { findByID } = require("../services/apiKey.services");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    // try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if(!key){
            throw new BadRequestError('Forbidden error (checkAuth File)');
        }

        // check if this objKey Exist in database 
        const objKey = await findByID(key);
        if(!objKey){
            throw new BadRequestError('API Not Exist (checkAuth File)');
        }

        req.objKey = objKey;
        return next();

    // } catch (error) {
    //     console.error(error);
    // }
}

const permission = ( pms ) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            throw new BadRequestError('Permission denied (checkAuth file)');
        }
        const validPermission = req.objKey.permissions.includes(pms)
        if(!validPermission){
            throw new BadRequestError('Permission denied (checkAuth file 2)');
        }

        return next();
    }
}


const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler
}