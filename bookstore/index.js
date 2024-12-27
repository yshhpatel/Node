const express = require("express");

const port = 1008;
const app = express();

db = require("./config/db");
const schema = require("./model/firstschema");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const book = await schema.find({});
    res.render("index", { book });
});

 app.post("/adddata", (req, res) => {
    schema.create(req.body);
     res.redirect("/");
});

 app.get("/deletedata", async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then((data)=>{
        res.redirect("/");
    })
});

 app.get("/editdata", async (req, res) => {
    let singledata = await schema.findById(req.query.id);
     res.render("edit", { singledata });
 });

app.post("/updatedata", async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
res.redirect("/");
 });
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server started on port number " + port);
    }
});
