const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },

    description:{
        type: String,
        required: true
    },

    price:{
        type: Number,
    },

    quantity:{
        type: Number,
        required: true
    },

    catagory:{
        type: mongoose.Schema.Types.ObjectId, ref:'Catagory', required:true
    },

    offers:{
        type:Number
    },

    productImages:[{
        img :{type:String}
    }] ,

    reviews:[{
        userId :{
            type: mongoose.Schema.Types.ObjectId, ref:'User', required:true 
            //new to me referencing other datatables. or "creating foreign Keys"
        },
        comment:{
            type: String,
        }
    }],

    createdBy:{
            type: mongoose.Schema.Types.ObjectId, ref:'User', required:true
        }

},
    { timestamps: true }
);

module.exports = mongoose.model('Product',productSchema);

    





