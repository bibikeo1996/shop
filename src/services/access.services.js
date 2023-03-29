'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenServices = require("./keyToken.services");
const {
    createTokenPair
} = require("../auth/authUtils");
const {
    getInforData
} = require("../utils");
const { BadRequestError } = require("../core/error.response");

const RoleShop = {
    SHOP: '01',
    WRITER: '02',
    EDITOR: '03',
    ADMIN: '04',
}

class AccessServices {
    static signUp = async ({
        name,
        email,
        password
    }) => {

        // step1: check email exists
        const holderShop = await shopModel.findOne({
            email
        }).lean();

        if (holderShop) {
            throw new BadRequestError('Email already registered!(Access services)');
        }

        const passwordHash = await bcrypt.hash(password, 10); // 2 variable 1 password and dificulty level
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // create privateKey, publicKey
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            const keyStorage = await KeyTokenServices.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            });

            if (!keyStorage) {
                throw new BadRequestError('Keystorage Error(Access services)');
            }

            // created token pair
            const tokens = await createTokenPair({
                userId: newShop._id,
                email
            }, publicKey, privateKey);

            return {
                code: 201,
                metadata: {
                    shop: getInforData({
                        fields: ['_id', 'name', 'email'],
                        object: newShop
                    }),
                    tokens
                }
            }

        }

        return {
            code: 200,
            metadata: null
        }
    }
}
module.exports = AccessServices;