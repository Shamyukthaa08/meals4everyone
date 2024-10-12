const mongoose = require('mongoose');


const surpriseBagSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    possibleItems: {
        type: [String], // Array to store multiple items
        required: true,
    },
    pickupTimings: {
        type: [String], // Array to store possible pickup timings
        required: true,
    },
    numberOfBags: {
        type: Number,
        required: true,
        // Minimum of 1 bag
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Price should be non-negative
    },
});

const surprisebag = mongoose.model('surprisebag', surpriseBagSchema);

module.exports = surprisebag;
