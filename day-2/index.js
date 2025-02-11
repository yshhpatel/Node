const express = require('express')
const port = 3000
const app = express();
app.set("view engine","ejs");
app.get('/', (req, res) => res.render("index"))
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("hale toj haaa hoo" + port);
    }
})

