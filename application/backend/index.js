const path = require("path");
const express = require("express");
const app = express();
//const db = require('./database.js')
const mysql = require('mysql2');
const { copyFileSync } = require("fs");
const bcrypt = require('bcrypt');
const { request } = require("http");
const { response } = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');

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

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/login", (request, response) =>{
    console.log("/login")
    const username = request.query.username;
    const password = request.query.password; 
    if(username && password){
        connection.query('SELECT * FROM User WHERE username = ?', [username], function(error, results, fields){
            if(results.length > 0 && username == results[0].username){
                bcrypt.compare(password, results[0].password, function(err, result){
                    if (err) { 
                        console.log("Error.");
                    }else if(result){
                        request.session.loggedin = true;
                        request.session.username = username;
                        console.log("Logged in.");
                    }else{
                        console.log("Passwords do not match.");
                    }
                });
            }else{
                console.log("Username or password is incorrect");
                response.send("Username or password is incorrect");
            }
            response.end();
        });
    }else{
        console.log("Please enter information correctly");
        response.send("Please enter information correctly");
        response.end();
    }
}
);


app.get("/sign-up", (req,res) =>{
    console.log("/sign-up");
    const givenEmail = req.query.email;
    const givenUsername = req.query.uname;
    const givenFirstName = req.query.firstName;
    const givenLastName = req.query.lastName;
    const givenPassword = req.query.password;
    const givenResubmitted = req.query.redonePassword;

    console.log(givenEmail)
    console.log(givenFirstName)
    console.log(givenLastName)
    console.log(givenPassword)
    console.log(givenResubmitted)
    console.log(givenUsername)

    function passwordValidate(password) {
        var re = {
            'capital' : /[A-Z]/,
            'digit'   : /[0-9]/,
            'special' : /[!@#$%^&*]/,
            'full'    : /^[A-Za-z0-9]{5,50}$/
        };
        return re.capital .test(password) && 
               re.digit   .test(password) && 
               re.digit   .test(password) &&
               re.full    .test(password);
               
    }

    connection.query("SELECT user_id, password FROM User WHERE username=? OR email=?", [givenUsername, givenEmail],
                            function(err, result, field){
                                if(result.length === 0){
                                    if(passwordValidate(givenPassword)){
                                        if(givenPassword === givenResubmitted){
                                            const hash = bcrypt.hashSync(givenPassword, 10);
                                            connection.query(`INSERT INTO User (email, first_name, last_name, password, username)
                                                            VALUES ('${givenEmail}','${givenFirstName}', '${givenLastName}', 
                                                            '${hash}', '${givenUsername}')`,
                                                            function(err, result){
                                                                if(err){
                                                                    throw err;
                                                                } else{
                                                                    res.json("success");
                                                                }
                                                            })
                                        }else{
                                            console.log("Passwords do not match.");
                                        }
                                    }else{
                                        console.log("Password must have SUCH AND SUCH values")
                                    }
                                } else{
                                    console.log("User does exist")
                                }
                            })
})

app.get("/search", (req,res) =>{
    console.log("/search");
    var name = req.query.searchTerm.toLowerCase();
    console.log(name);
    var category = req.query.searchCategory
    console.log(category);
    var requestedSearchResults = {searchResults:[]}

    if(category == 'Pets'){
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
                        "age_name": row.age_name,
                        "profile_pic": row.profile_pic
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Businesses'){
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
                        "name": row.name,
                        "profile_pic": row.profile_pic
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Shelters'){
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
                        "name": row.name,
                        "profile_pic": row.profile_pic
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