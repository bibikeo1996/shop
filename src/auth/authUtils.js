'use strict'
const JWT = require('jsonwebtoken');
// pair token 
const createTokenPair = async ( payload, publicKey, privateKey ) => {
    try{
        // accessToken
        const accessToken = await JWT.sign( payload, privateKey, {
            expiresIn: '2 days'
        });

        const refreshToken = await JWT.sign( payload, privateKey, {
            expiresIn: '7 days'
        });

        JWT.verify( accessToken, publicKey, (err, decode) => {
            if(err){
                console.error(`Error verify:: `, err);
            }else{
                console.log(`Decode verify:: `, decode)
            }
        })

        return { accessToken, refreshToken };
    }catch(err){

    };
};

module.exports = {
    createTokenPair,
};