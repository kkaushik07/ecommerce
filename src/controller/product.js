const Product = require('../models/product');
const slugify = require( 'slugify');


exports.addProduct = (req,res)=>{
    const { name,description,price,offers,catagory,quantity,createdBy} = req.body;
    const productImages = req.files.map(file => {return {img : file.filename }});
    const product = new Product({
        name,
        description,
        price,
        quantity,
        offers,
        productImages,
        slug: slugify(name),
        catagory,
        createdBy: req.user._id
    });

    product.save((err,product)=>{
        if(err) return res.status(400).json({err});
        if(product) return res.status(201).json({ message:'product added'  ,product});
    });

    
};