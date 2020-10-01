const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    visitorIn: {
        type: Number,
        required: true
    },
    visitorOut: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var Locations = mongoose.model('Location', locationSchema);

module.exports = Locations;