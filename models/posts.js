const mongoose = require('mongoose');

// Post şemasını tanımlayın
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Post modelini tanımlayın
const Post = mongoose.model('Post', postSchema);

// Post modelini dışa aktarın
module.exports = Post;
