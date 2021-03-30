const path = require("path");
const express = require("express");
const app = express();
const db = require('./database.js')
 
app.get("/", (req,res) =>{
    console.log("/");
    res.json({route: '/'})
});

app.get("/search-results", (req,res) =>{
    console.log("/search-results");
    res.json({route: 'search-results'})
});

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});