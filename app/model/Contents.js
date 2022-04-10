const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images: {
        type: String
    },
    title: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Content', contentSchema);
