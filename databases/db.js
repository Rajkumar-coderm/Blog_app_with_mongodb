const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.URL
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Databases connected successfully..');
})
mongoose.connection.on('error', () => {
    console.log('Databases is not connected..');
})

module.exports = mongoose;