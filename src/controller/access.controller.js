'use strict'

const AccessServices = require("../services/access.services");

class AccessController {
    signUp = async(req, res, next) => {
        try{
            /*
            200 => ok
            201 => created
            */
            return res.status(201).json(await AccessServices.signUp(req.body));
        }catch(err){
            next(err);
        }
    }
};
module.exports = new AccessController();