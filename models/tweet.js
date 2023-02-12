const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const tweetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
        maxlength: 256
    },
    imagePath: {
        type: String,
        required: false,
        maxlength: 1000
    },
    publishDate: {
        type: Date,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kudos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

tweetSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('Tweet', tweetSchema);