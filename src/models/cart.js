const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId, ref: 'User',
        required: true
    },

    cartItems: [{

        name: {
            type: String,
            required: true,
            trim: true
        },
        /*price: {
            type: mongoose.Types.ObjectId , ref:'Product',
            required: true
        },*/
        quantity: {
            type: Number,
            default: 1
        }
    }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);