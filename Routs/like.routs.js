const express = require('express')
const Routs = express.Router()
const { authenticateToken } = require('../Auth/jwt')
const db = require('../models/likeDislike')
const user_db = require('../models/user')
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded()

Routs.get('/like', authenticateToken, encoded, async (req, res) => {
    try {
        let user = await user_db.find({ email: req.data.Email })
        await db.insertMany({
            user_id: user[0]._id,
            like: true,
            dislike: false
        })
        .then((result) => {
            res.status(200).redirect('/getpost')
                console.log(result);
        }).catch((err) => {
            res.status(403).send({ message: err.message })
        })
    } catch (error) {
        console.log({ mes: error.message });
    }
})


Routs.get('/dislike', authenticateToken, encoded, async (req, res) => {
    try {
        let user = await user_db.find({ email: req.data.Email })
        await db.insertMany({
            user_id: user[0]._id,
            like: false,
            dislike: true
        })
        .then((result) => {
            res.status(200).redirect('/getpost')
                console.log(result);
        }).catch((err) => {
            res.status(403).send({ message: err.message })
        })
    } catch (error) {
        console.log({ mes: error.message });
    }
})

module.exports = Routs