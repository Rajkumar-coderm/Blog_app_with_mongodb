const mongoose = require('../databases/db')
const blogSchema = new mongoose.Schema({
    auther: {
        type: String,
        required: [true, "Please fill the auther  field and then submit"]
    },
    body: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: [true, "Please fill the Description and then next"]
    }
})
module.exports = mongoose.model('blog', blogSchema)