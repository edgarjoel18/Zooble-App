const path = require("path");
const express = require("express");
const app = express();
// const db = require('./database.js')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'csc648project-database.ceh0a99r5rym.us-west-2.rds.amazonaws.com',
    user:'admin',
    password:'7Fb!Ve35',
    database: 'petsdb'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
})

app.get("/", (req,res) =>{
    console.log("/");
    res.json({route: '/'})
});

app.get("/search-results", (req,res) =>{
    console.log("/search-results");
    var name = "Max";

    connection.query(`SELECT * FROM Pet WHERE name = '${name}'`, function(err, result) {
        if(err){
            throw err;
        } else {
          
            // [ TextRow { pet_id: 1, name: 'Max', size_id: 1, age_id: 1 } ]
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.name);
                console.log(row.size_id);
                console.log(row.age_id);
                
              });
            
        }
    });
    
    res.json({route: 'search-results'});
});

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});