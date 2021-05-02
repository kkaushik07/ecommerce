const Cart = require("../models/cart");


exports.addtocart = (req, res) => {



    Cart.findOne({ user: req.user._id }).exec((err, cart) => {
        if (err) { return res.status(400).json({ err }) };
        if (cart) {

            const name = req.body.cartItems.name;
            const item = cart.cartItems.find(c => c.name == name); //why small??

        if(item){
            Cart.findOneAndUpdate({ user: req.user._id , "cartItems.name" : name },{
                '$set': {
                    'cartItems.$': {
                        ...req.body.cartItems,
                        quantity: item.quantity + req.body.cartItems.quantity
                    }
                }
            }).exec((err,cart)=>{
                if (err) return res.status(400).json({err})
                if (cart) return res.status(201).json({cart})
                
            })
        }else{

            Cart.findOneAndUpdate({ user: req.user._id }, {
                '$push': {
                    'cartItems': req.body.cartItems
                }
            }).exec((err,cart)=>{
                if (err) return res.status(400).json({err})
                if (cart) return res.status(400).json({cart})
                
            })}
        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [{
                    name:req.body.name,
                    quantity:req.body.quantity
                }]
            });

            cart.save((err, c) => {
                if (err) return res.status(400).json({ err });
                if (c) return res.status(201).json({ c });
            })
        };
    });

};