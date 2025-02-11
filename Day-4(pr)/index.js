const express = require('express')
const port = 2003

const app = express()

let Book = []
app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.render("index", { Book })
})
app.post("/addData", (req, res) => {
    req.body.id = String(Date.now())
    Book.push(req.body)
    res.redirect("/")


})
app.get("/deleteData", (req, res) => {
    Book = Book.filter((e) => e.id !== req.query.id)
    res.redirect("/")
})
app.get("/editData", (req, res) => {
    singleBook = Book.find((e) => e.id == req.query.id)
    res.render("update", { singleBook });
})
app.post("/updateData", (req, res) => {
    let tempData = Book.map((e) => e.id == req.body.id ? req.body : e)
    Book = tempData
    res.redirect("/")
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server started http://localhost:${port}/`)
})