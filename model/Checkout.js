const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../model/User");
const Product = require("../model/Product");

const checkoutSchema = new Schema({
    // date created on
    dateCreated: {
        type: Date,
        default: Date.now()
    },

    // shipping information
    shipping: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    // products bought
    products: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'product' 
        }
    ],

    // payment method
    paymentType: {
        type: String,
        required: true
    },
    
    // total price
    price: {
        type: number,
        required: true
    }

});