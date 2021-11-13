const mongoose = require("../databases/db")
const likeDislikeShema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Please provide user id"]
    },
    like: {
        type: Boolean,
        required: [true, "Please fill the fileld like true or false"]
    },
    dislike: {
        type: Boolean,
        required: [true, "Please fill the fileld Dislike true or false"]
    }
})
module.exports = mongoose.model('likeDislike', likeDislikeShema)