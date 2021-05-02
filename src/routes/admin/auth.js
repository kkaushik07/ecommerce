const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const { validateSigninRequest, isValidated, validateSignupRequest} = require('../../validator/validator');
const router = express.Router(); //??


router.post('/admin/signin',validateSigninRequest,isValidated ,  signin);
router.post('/admin/signup',validateSignupRequest,isValidated , signup);


module.exports = router;