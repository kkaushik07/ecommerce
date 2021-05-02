const { check, validationResult } = require('express-validator');


exports.validateSignupRequest = [check('firstName')
    .notEmpty()
    .withMessage('first name is required'),
check('lastName')
    .notEmpty()
    .withMessage('last name is required'),
check('email')
    .isEmail()
    .withMessage('Valid email is required'),
check('password')
    .isLength({ min: 6 })
    .withMessage('password should be 6 charactor long')
    .matches(/\d/)
    .withMessage('password must contain a number')
];

exports.validateSigninRequest = [
check('email')
    .isEmail()
    .withMessage('Valid email is required'),
check('password')
    .isLength({ min: 6 })
    .withMessage('password should be 6 charactor long')
    .matches(/\d/)
    .withMessage('password must contain a number')
];

exports.isValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0){
    return res.status(400).json({
        errors: errors.array()
    })}
    next()
};
