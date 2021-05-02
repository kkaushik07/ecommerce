const express = require('express');
const { adminMiddleware, signinRequired } = require('../comman middleware');
const { addProduct } = require('../controller/product');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req,file,cb){
        cb(null, shortid.generate()+ '-' + file.originalname)
    }
})

const upload = multer({ storage });



router.post('/product/create',signinRequired,adminMiddleware,upload.array('productImages'),addProduct);
module.exports = router;