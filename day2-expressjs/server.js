const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("You reached backend");
})


app.use(express.json());

app.post("/auth/create", (req, res)=>{
    console.log(req.body);
    res.end("Did it runned?")
})

app.listen(port, ()=>{
    console.log("Server running on port", port);
    
})