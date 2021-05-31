const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../model/User");
const Product = require("../model/Product");

const userDetailSchema = new Schema({
    /**
     * @ref : Same as model name
     * defined in `modelSchema`.
     */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // stores the users address
    address: {
        type: String,
        required: true,
    },
    // stores the current account balance
    balance: {
        type: Number,
        min: 0
    },
    // stores list of products created/published by this user
    myProducts: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'product' 
        }
    ],
    // stores list of products bought by this user
    history: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'product' 
        }
    ],
    // stores list of products on watchlist
    watchList: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'product' 
        }
    ]
});

module.exports = mongoose.model("userDetail", userDetailSchema);