const express = require("express");
const app = express();
const path=require('path')
// const express = require("express")
const db = require('./databases/db')
    // const app = express()
app.set('views',path.join(__dirname,'view'))
app.use(express.static(__dirname + '/view'))
app.set('view engine', 'ejs');
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('login')
})
app.get("/login", (req, res) => {
    res.render('login')
})

app.get("/register", (req, res) => {
    res.render('register')
})

app.get("/blog", (req, res) => {
    res.render('blog')
});
module.exports = app;