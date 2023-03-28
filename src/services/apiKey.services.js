'use strict'

const keyAPIModel = require("../models/keyAPI.model")
const crypto = require("crypto");

const findByID = async (key) => {
    //create a API key
    // const newKey = await keyAPIModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
    const objKey = await keyAPIModel.findOne({ key, status: true }).lean();
    return objKey;
}

module.exports = {
    findByID,
}