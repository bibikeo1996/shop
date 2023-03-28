'use strict'
const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// check API
router.use(apiKey);
// check API Permission
router.use(permission('0000'));
// Api router
router.use('/v1/api', require('./access'));

module.exports = router;