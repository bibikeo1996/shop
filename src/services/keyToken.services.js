'use strict'
// Generate publicKey
const keytokenModel = require("../models/keytoken.model");

class KeyTokenServices {
    static createKeyToken = async ({userId, publicKey, privateKey}) => {
        try{
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            });

            return tokens ? tokens.publicKey : null;

        }catch(err){
            return err;
        }
    }
}

module.exports = KeyTokenServices;