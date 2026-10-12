const express = require("express");
const connectDb = require("./database/db");
const NotesModel = require("./models/note.model");

const app = express();
app.use(express.json())

app.get("/",  (req, res)=>{
    res.send("Backend Working Perfectly");
})

connectDb();

app.post("/create", async (req, res)=>{
    let {title, description} = req.body
    const newNote = await NotesModel.create({
        title,
        description
    })
    res.send({
        data : newNote,
        success: true,
    })
})


module.exports = app