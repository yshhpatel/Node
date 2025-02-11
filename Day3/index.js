const express = require("express");
const port = 1008;

const app = express()

let Students = []

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index", { Students })
});
app.post("/addData", (req, res) => {
    req.body.id = String(Date.now());
    Students.push(req.body);
    res.redirect("/");
})  

app.get("/deleteData", (req, res) => {
    let deleteRecord = Students.filter((e) => e.id !== req.query.id);
    Students = deleteRecord;
    res.redirect("/");
})


app.get ("/editData/:id",(req,res)=>{
    let singledata = Students.find((e)=>e.id==req.params.id)
    console.log(req.params.id);
    res.render("edit",{singledata});

})

app.post("/updateData",(req,res)=>{
    Students.map((e)=>{
        if (e.id==req.body.id){
            e.id=req.body.id
            e.name=req.body.name
            e.city=req.body.city
            e.subject=req.body.subject
        }
        else{e
            
        }
    })
    res.redirect("/")
})



app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on Port : " + port);

})