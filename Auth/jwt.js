const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.generateAccessToken = user => {
    const token = jwt.sign(user, process.env.SECRET_KEY)
    return token
}

exports.authenticateToken = (req, res, next) => {
    if (req.headers.cookie == undefined) {
        console.log({ message: 'Token not found' });
        return res.redirect('/login')
    }
    const token = req.headers.cookie.split('=')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            console.log({ message: "JWT expired" });
            return res.redirect('/login')
        }
        req.data = data
        next()
    });

}