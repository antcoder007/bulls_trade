const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../model/User");

const productSchema = new Schema({
    /**
     * @ref : Same as model name
     * defined in `modelSchema`.
     */
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    prdocutName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 125
    },
    productDescription: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 255
    },
    // product selling price
    price: {
        type: Number,
        min: 0
    },
    // product image
    image: {
        type: String,
        default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
        required: true
    },
    // check if product is available
    isAvailable: {
        type: Boolean,
        default: true
    },
    // date created on
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("product", productSchema);