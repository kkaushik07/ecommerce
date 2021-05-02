const express = require('express');

const { signinRequired, userMiddleware } = require('../comman middleware/index');
const { addtocart } = require('../controller/cart');

const router = express.Router();

router.post('/cart/add-to-cart',signinRequired,userMiddleware,addtocart);


module.exports = router;