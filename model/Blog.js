const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogComments = new this.schema({
    username: {
        type: String,
        maxLength: 256,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})

const BlogSchema = new Schema({
    author: {
        type: String,
        maxLength: 256,
        required: true
    },
    title: {
        type: String,
        maxLength: 256,
        required: true
    },
    body: {
        type: String,
        default: '',
    },
    tags: [String],
    photo:{
        data: Buffer,
        contentType: String
    },
    comments:{
        type: [BlogComments],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const blogModel = mongoose.model('Blog', BlogSchema);
module.exports = blogModel;

