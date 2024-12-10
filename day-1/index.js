

const http = require ("http");
const port =1222;

const portHandel = (req,res)=>{

    res.write("<h1>hello</h1>");
    res.end();j
}

const server=http.createServer(portHandel);

server.listen(port,(err)=>{
    err?console.log(err) : console.log("hale he vo :" +port);

});
    