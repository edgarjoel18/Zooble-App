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

const cookieParser = require('cookie-parser');
const { traceDeprecation } = require("process");

// const cors = require('cors');

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

app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "zooble",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, //1 day expiration
    }
}))

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/login",(req, res) =>{
    if(req.session.username){
        res.send({loggedIn: true, user: req.session.username})
    } else{
        res.send({loggedIn: false})
    }
})

app.get("/logout",(req,res) =>{
    req.session.loggedin = false;
    req.session.username = null;
    res.send({loggedIn:false})
})

app.post("/login", (req, res) =>{
    console.log("/login")
    const username = req.body.username;
    const password = req.body.password;
    
    if(username && password){
        connection.query('SELECT * FROM User WHERE username = ?', [username], function(error, results, fields){
            if(results.length > 0 && username == results[0].username){
                bcrypt.compare(password, results[0].password, function(err, result){
                    if (err) { 
                        console.log("Error.");
                    }else if(result){
                        req.session.loggedin = true;
                        req.session.username = username;
                        console.log(req.session.username);
                        console.log(result);
                        res.status(200).json(result)
                        console.log("Logged in.");
                    }
                });
            }else{
                console.log("Username or password is incorrect");
                res.status(500).json("no match")
                // res.send("Username or password is incorrect");
            }
            // res.end();
        });
    }else{
        console.log("Please enter information correctly");
        res.status(500).json("incomplete");
    }
}
);


app.post("/sign-up", (req,res) =>{
    console.log("/sign-up");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;

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
                                                                    res.json(result);
                                                                }
                                                            })
                                        }else{
                                            console.log("Passwords do not match.");
                                            res.status(200).json(result);
                                        }
                                    }else{
                                        console.log("Password must have SUCH AND SUCH values")
                                        res.status(500).json("password requirements");
                                    }
                                } else if(result.length != 0){
                                    console.log("User does exist")
                                    res.status(500).json("exists");
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
    else if(category == 'Pet Owners'){
        console.log('searching through RegisteredPetOwner')
        connection.query(
            `SELECT * 
            FROM RegisteredPetOwner
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
                        "reg_pet_owner_id":row.reg_pet_owner_id,
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

