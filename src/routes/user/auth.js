const express = require('express');

const { signup, signin } = require('../../controller/user/auth');
const { validateSignupRequest, isValidated, validateSigninRequest } = require('../../validator/validator');
const router = express.Router(); //??


router.post('/signin',validateSigninRequest,isValidated ,signin);
router.post('/signup', validateSignupRequest, isValidated ,signup);   // (/route, validator, controller)


module.exports = router;