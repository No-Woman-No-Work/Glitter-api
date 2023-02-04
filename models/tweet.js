const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const tweetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
        maxlength: 256
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
});

tweetSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tweet', tweetSchema);