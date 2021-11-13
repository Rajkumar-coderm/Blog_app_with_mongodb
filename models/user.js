const mongoose = require('../databases/db')
const validator = require('validator');

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('User', userShema)