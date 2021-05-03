const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const connection = require('../db');

router.get("/api/login",(req, res) =>{ //check if user is logged in
    console.log(req.session);
    if(req.session.username){
        res.send({loggedIn: true, user: req.session.username})
    } else{
        res.send({loggedIn: false}) 
    }
})

router.post("/api/login", (req, res) =>{ //login user
    console.log("/login")
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    
    if(username && password){
        connection.query('SELECT * FROM Credentials WHERE username = ?', [username], function(error, results, fields){
            if(results.length > 0 && username == results[0].username){
                var result = bcrypt.compareSync(password, results[0].password);
                if (result) { 
                    req.session.loggedin = true;
                    req.session.username = username;
                    console.log("Req.session.username: ", req.session.username);
                    console.log(result);
                    res.status(200).json(result)
                    console.log("Logged in.");    
                }
                else{
                    console.log("Password is incorrect");
                    res.status(400).json("no match");
                }
            
            }else{
                console.log("Username is incorrect");
                res.status(400).json("no match");
                // res.send("Username or password is incorrect");
            }
            // res.end();
        });
    }else{
        console.log("Please enter information correctly");
        res.status(400).json("incomplete");
    }
}
);

module.exports = router