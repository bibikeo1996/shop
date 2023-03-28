'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenServices = require("./keyToken.services");
const { createTokenPair } = require("../auth/authUtils");
const { getInforData } = require("../utils");

const RoleShop = {
    SHOP: '01',
    WRITER: '02',
    EDITOR: '03',
    ADMIN: '04',
}

class AccessServices{
    static signUp = async ({ name, email, password }) => {
        try{
            // step1: check email exists
            const holderShop = await shopModel.findOne({ email }).lean();
            if(holderShop){
                return {
                    code: 409,
                    message: 'Email already registered!(Access services)'
                }
            }
            
            const passwordHash = await bcrypt.hash(password, 10); // 2 variable 1 password and dificulty level
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if(newShop){
                // create privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                const keyStorage = await KeyTokenServices.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });

                if(!keyStorage){
                    return {
                        code: 409,
                        message: 'keyStorage error(Access services)'
                    }
                }

                // created token pair
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey);

                // console.log(`Created Token Success:: ` + tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInforData({ fields: ['_id','name','email'], object: newShop }),
                        tokens
                    }
                }
                //const tokens = await 
            }

            return {
                code: 200,
                metadata: null
            }
        }catch(err){
            console.error(err);
            return{
                code: 404,
                message: err.message +" Access services file",
                status: 'error'
            }
        }
    }
}
module.exports = AccessServices;