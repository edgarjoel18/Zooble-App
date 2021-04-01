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

app.get("/search", (req,res) =>{
    console.log("/search");
    var name = req.query.searchTerm.toLowerCase();
    console.log(name);
    var category = req.query.searchCategory
    console.log(category);
    var requestedSearchResults = {searchResults:[]}

    if(category == 'Pet'){
        connection.query(
            `SELECT * 
            FROM ((Pet
            INNER JOIN Age
            ON Pet.age_id = Age.age_id)
            INNER JOIN Size
            ON Pet.size_id = Size.size_id)
            WHERE LOWER(name) LIKE '%${name}%'
            `, 
            function(err, result) {
            if(err){
                throw err;
            } else {
              
                // [ TextRow { pet_id: 1, name: 'Max', size_id: 1, age_id: 1 } ]
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    // console.log(row);
                    // console.log(row.name);
                    // console.log(row.size_id);
                    // console.log(row.age_id);
                    requestedSearchResults.searchResults.push({
                        "pet_id":row.pet_id,
                        "name": row.name,
                        "size_name": row.size_name,
                        "age_name": row.age_name
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Business'){
        connection.query(
            `SELECT * 
            FROM RegisteredBusiness
            WHERE LOWER(name) LIKE '%${name}%'
            `, 
            function(err, result) {
            if(err){
                throw err;
            } else {
              
                // [ TextRow { pet_id: 1, name: 'Max', size_id: 1, age_id: 1 } ]
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    // console.log(row);
                    // console.log(row.name);
                    // console.log(row.size_id);
                    // console.log(row.age_id);
                    requestedSearchResults.searchResults.push({
                        "reg_business_id":row.reg_business_id,
                        "reg_user_id":row.reg_user_id,
                        "name": row.name
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Shelter'){
        connection.query(
            `SELECT * 
            FROM RegisteredShelter
            WHERE LOWER(name) LIKE '%${name}%'
            `, 
            function(err, result) {
            if(err){
                throw err;
            } else {
              
                // [ TextRow { pet_id: 1, name: 'Max', size_id: 1, age_id: 1 } ]
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    // console.log(row);
                    // console.log(row.name);
                    // console.log(row.size_id);
                    // console.log(row.age_id);
                    requestedSearchResults.searchResults.push({
                        "reg_shelter_id":row.reg_shelter_id,
                        "reg_user_id":row.reg_user_id,
                        "name": row.name
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }


});

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});