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
    var name = req.query.searchTerm.toLowerCase();
    console.log(name);
    var searchResults = {searchResults:[]}

    connection.query(`SELECT * FROM Pet WHERE LOWER(name) LIKE '%${name}%'`, function(err, result) {
        if(err){
            throw err;
        } else {
          
            // [ TextRow { pet_id: 1, name: 'Max', size_id: 1, age_id: 1 } ]
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row);
                console.log(row.name);
                console.log(row.size_id);
                console.log(row.age_id);
                searchResults.searchResults.push({
                    "pet_id":row.pet_id,
                    "name": row.name,
                    "size_id": row.size_id,
                    "age_id": row.age_id
                });
              });
            console.log(searchResults);
            res.json(searchResults);
        }
    });

});

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});