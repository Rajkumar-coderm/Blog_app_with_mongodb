const express = require('express')
const bcrypt = require('bcrypt')
const { generateAccessToken, authenticateToken } = require('../Auth/jwt')
const app = express()
const Routs = express.Router()
app.use(express.json())
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded()
const multer = require('multer')
const db = require('../models/user')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

Routs.post("/register", encoded, upload.single('image'), async(req, res) => {
    try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const profileImage = {
            contentTyepe: req.file.mimetype,
            path: req.file.path,
            image: new Buffer(encode_img, 'base64')
        };
        let path = profileImage.path
        const { name, email, password } = req.body
        console.log(profileImage);
        const userdata = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            image: path
        }
        await db.insertMany(userdata)
            .then((result) => {
                res.status(200).redirect('/login')
                fs.unlinkSync(path)
            }).catch((err) => {
                res.status(500).send({ message: err })
            });
    } catch (error) {
        console.log({ msg: error.message });
    }
})


Routs.post('/login', encoded, async(req, res) => {
    try {
        const data = await db.find({ email: req.body.email })
        console.log(data[0].email);
        if (data[0].email) {
            console.log(req.body.email);
            if (data[0].email == req.body.email) {
                if (bcrypt.compareSync(req.body.password, data[0].password)) {
                    const token = generateAccessToken({ Email: req.body.email })
                    res.cookie("token", token).status(200).redirect('/blog')
                } else {
                    res.status(404).send({ message: "incorrect Password" })
                }
            } else {
                res.status(404).send({ message: "incorrect Email..." })
            }
        } else {
            res.redirect('/register')
        }
    } catch (error) {
        console.log({ msg: error.message });
    }
})

Routs.get('/get', async(req, res) => {
    try {
        const data = await db.find({}, { name: 1, email: 1 })
        res.status(200).json({ data: data })
    } catch (error) {
        console.log({ msg: error.message });
    }
})

Routs.post("/editprofile", authenticateToken, encoded, async(req, res) => {
    console.log(req.data);
    try {
        const data = await db.find({ email: req.data.Email })
        console.log(data);
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        await db.findByIdAndUpdate({ _id: data[0]._id }, {
                $set: userData,
            })
            .then((result) => {
                res.status(200).send({ message: "successfull upaded in databases.." })
            }).catch((err) => {
                res.status(500).send({ message: err.message })
            });
    } catch (error) {
        console.log({ msg: error.message });
    }
})


Routs.get('/logout', authenticateToken, (req, res) => {
    try {
        res.clearCookie('token')
        res.redirect('/login')
        console.log("Logout successfully..");
    } catch (error) {
        console.log({ msg: error.message });
    }
});


module.exports = Routs