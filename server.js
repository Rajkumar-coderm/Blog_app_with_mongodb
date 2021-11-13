require("dotenv").config()
const PORT = process.env.PORT
const app = require('./app')

app.use(require('./Routs/user.routs'))
app.use(require('./Routs/blog.routs'))
app.use(require('./Routs/like.routs'))

app.use("*", (req, res) => {
    res.json({ error: 404, message: "Page Not Found" })
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})