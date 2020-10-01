const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;