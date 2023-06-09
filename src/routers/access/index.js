'use strict'
const express = require('express');
const { asyncHandler } = require('../../auth/checkAuth');
const accessController = require('../../controller/access.controller');
const router = express.Router();


// SignUp
router.post('/shop/signup', asyncHandler(accessController.signUp));

module.exports = router;