const express = require('express')
const Routs = express.Router()
const db = require('../models/Blog')
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded()

Routs.post('/postblog', encoded, async(req, res) => {
    try {
        let { auther, body, description } = req.body
        await db.insertMany({
                auther: auther,
                body: body,
                description: description
            })
            .then((data) => {
                res.status(200).redirect('/getpost')
            }).
        catch((err) => {
            res.send(err.message)
        })
    } catch (error) {
        console.log(error.message);
    }
})

Routs.get('/getpost', async(req, res) => {
    let data = await db.find()
    res.render('home',{data:data})
})

module.exports = Routs