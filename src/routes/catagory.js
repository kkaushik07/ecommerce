const express = require('express');

const { fetchCatagories, addCatagory } = require('../controller/catagory');
const { signinRequired, adminMiddleware } = require('../comman middleware/index');

const router = express.Router();

router.post('/catagory/create',signinRequired,adminMiddleware,addCatagory)  
router.get('/catagories',fetchCatagories); 

module.exports = router;