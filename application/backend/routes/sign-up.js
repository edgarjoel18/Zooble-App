//Will contain all sign-up related routes
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

const connection = require('../db');

function passwordValidate(password) {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'special' : /[!@#$%^&*]/,
        'full'    : /^[A-Za-z0-9!@$%^&*]{8,50}$/
    };
    return re.capital .test(password) && 
           re.digit   .test(password) && 
           re.special .test(password) &&
           re.full    .test(password);
           
}

router.post("/api/sign-up", (req,res) =>{
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

    connection.query("SELECT user_id FROM User WHERE email=?", givenEmail,  //check if email is taken
                            function(err, users, field){
                                if(users.length === 0){
                                    connection.query("SELECT username FROM Credentials WHERE username=?", givenUsername, function(err,usernames, field){  //check if username is taken
                                        if(usernames.length===0){
                                            if(passwordValidate(givenPassword)){  //if password is valid
                                                if(givenPassword === givenResubmitted){  //if password and confirmed password match
                                                    const hash = bcrypt.hashSync(givenPassword, 10);

                                                    connection.query(`INSERT INTO User (email,first_name, last_name) VALUES ('${givenEmail}','${givenFirstName}', '${givenLastName}')`, function(err, insertedUser){
                                                        if(err){
                                                            res.status(500).json(err);
                                                        }
                                                        else{
                                                            console.log('User Created');
                                                            console.log(insertedUser.insertId); //user id of newly created user
                                                            connection.query(`INSERT INTO Account (user_id)  VALUES  ('${insertedUser.insertId}')`, //create new account in database with returned user_id //registered user entry and profile automatically created
                                                            function(err,account){
                                                                if(err){
                                                                    res.status(500).json(err);
                                                                }
                                                                console.log('Account Created');
                                                                console.log(account.insertId); //account id of newly created account
                                                                connection.query(`INSERT INTO Credentials (acct_id, username, password) VALUES ('${account.insertId}', '${givenUsername}', '${hash}')`, 
                                                                function(err,insertedCredentials){
                                                                    if(err){
                                                                        res.status(500).json(err);
                                                                    }
                                                                    console.log('Credentials Created');
                                                                    console.log(insertedCredentials.insertId);
                                                                })
                                                            }); 
                                                            res.status(200).json(insertedUser);
                                                        }
                                                    })
                                                    
                                                    // connection.query(`INSERT INTO Credentials (email, first_name, last_name, password, username)
                                                    //                 VALUES ('${givenEmail}','${givenFirstName}', '${givenLastName}', 
                                                    //                 '${hash}', '${givenUsername}')`,
                                                    //                 function(err, result){
                                                    //                     if(err){
                                                    //                         throw err;
                                                    //                     } else{
                                                    //                         res.status(201).json(result);
                                                    //                     }
                                                    //                 })
                                                }else{
                                                    console.log("Passwords do not match.");
                                                    res.status(400).json("passwords not matching");
                                                }
                                            }else{
                                                console.log("Password must have SUCH AND SUCH values")
                                                res.status(400).json("password requirements");
                                            }
                                        }
                                        else if(usernames.length != 0){  //if username is taken
                                            console.log("Username already taken")
                                            res.status(400).json("exists");
                                        }
                                    })
                                    
                                } else if(users.length != 0){
                                    console.log("User does exist")
                                    res.status(400).json("exists");
                                }
                            })
})

router.post('/api/sign-up/business', (req,res) =>{
    //regular sign up
    console.log("/sign-up");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;
    const givenBusinessName = req.body.businessName;
    const givenPhoneNumber = req.body.phoneNumber;
    const givenAddress = req.body.address;
    const givenLatitude = req.body.latitude;
    const givenLongitude = req.body.longitude;
    const givenBusinessType = req.body.type;

    console.log(givenEmail)
    console.log(givenFirstName)
    console.log(givenLastName)
    console.log(givenPassword)
    console.log(givenResubmitted)
    console.log(givenUsername)
    console.log(givenBusinessName)
    console.log(givenPhoneNumber)
    console.log(givenAddress)
    console.log(givenLatitude)
    console.log(givenLongitude)
    console.log(givenBusinessType)

    var userId;

    connection.query("SELECT user_id FROM User WHERE email=?", givenEmail,  //check if email is taken
                            function(err, users, field){
                                if(users.length === 0){
                                    connection.query("SELECT username FROM Credentials WHERE username=?", givenUsername, function(err,usernames, field){  //check if username is taken
                                        if(usernames.length===0){
                                            if(passwordValidate(givenPassword)){  //if password is valid
                                                if(givenPassword === givenResubmitted){  //if password and confirmed password match
                                                    const hash = bcrypt.hashSync(givenPassword, 10);

                                                    connection.query(`INSERT INTO User (email,first_name, last_name) VALUES ('${givenEmail}','${givenFirstName}', '${givenLastName}')`, function(err, insertedUser){
                                                        if(err){
                                                            res.status(500).json(err);
                                                        }
                                                        else{
                                                            console.log('User Created');
                                                            console.log(insertedUser.insertId); //user id of newly created user
                                                            userId = insertedUser.insertId;
                                                            connection.query(`INSERT INTO Account (user_id)  VALUES  ('${insertedUser.insertId}')`, //create new account in database with returned user_id //registered user entry and profile automatically created
                                                            function(err,account){
                                                                if(err){
                                                                    res.status(500).json(err);
                                                                }
                                                                console.log('Account Created');
                                                                console.log(account.insertId); //account id of newly created account
                                                                connection.query(`INSERT INTO Credentials (acct_id, username, password) VALUES ('${account.insertId}', '${givenUsername}', '${hash}')`, 
                                                                function(err,insertedCredentials){
                                                                    if(err){
                                                                        res.status(500).json(err);
                                                                    }
                                                                    console.log('Credentials Created');
                                                                    console.log(insertedCredentials.insertId);
                                                                    connection.query(`INSERT INTO Business (name, phone_num, reg_user_id) VALUES ('${givenBusinessName}', '${givenPhoneNumber}', (SELECT reg_user_id FROM RegisteredUser WHERE user_id= ${userId}))`,
                                                                    function(err, insertedBusiness){
                                                                        if(err){
                                                                            console.log(err);
                                                                            // res.status(500).json(err);
                                                                        }
                                                                        console.log('Business Created');
                                                                        console.log(insertedBusiness.insertId);
                                                                        connection.query(`INSERT INTO Commerce (business_id, business_type_id) VALUES ('${insertedBusiness.insertId}', '${givenBusinessType}')`,
                                                                        function(err, insertedCommerce){
                                                                            if(err){
                                                                                console.log(err);
                                                                                // res.status(500).json(err);
                                                                            }
                                                                            console.log('Commerce Created');
                                                                            console.log(insertedCommerce.insertId);
                                                                        })
                                                                    })
                                                                })
                                                            }); 
                                                            res.status(200).json(insertedUser);
                                                        }
                                                    })
                                                }else{
                                                    console.log("Passwords do not match.");
                                                    res.status(400).json("passwords not matching");
                                                }
                                            }else{
                                                console.log("Password must have SUCH AND SUCH values")
                                                res.status(400).json("password requirements");
                                            }
                                        }
                                        else if(usernames.length != 0){  //if username is taken
                                            console.log("Username already taken")
                                            res.status(400).json("exists");
                                        }
                                    })
                                    
                                } else if(users.length != 0){
                                    console.log("User does exist")
                                    res.status(400).json("exists");
                                }
                            })
})

router.post('/api/sign-up/shelter', (req,res) =>{
    console.log("/sign-up/shelter");
    const givenEmail = req.body.email;
    const givenUsername = req.body.uname;
    const givenFirstName = req.body.firstName;
    const givenLastName = req.body.lastName;
    const givenPassword = req.body.password;
    const givenResubmitted = req.body.redonePassword;
    const givenBusinessName = req.body.businessName;
    const givenPhoneNumber = req.body.phoneNumber;
    const givenAddress = req.body.address;
    const givenLatitude = req.body.latitude;
    const givenLongitude = req.body.longitude;
    const givenPetTypes = req.body.petTypes;

    console.log(givenEmail)
    console.log(givenFirstName)
    console.log(givenLastName)
    console.log(givenPassword)
    console.log(givenResubmitted)
    console.log(givenUsername)
    console.log(givenBusinessName)
    console.log(givenPhoneNumber)
    console.log(givenAddress)
    console.log(givenLatitude)
    console.log(givenLongitude)
    console.log(givenPetTypes)

    var userId;

    connection.query("SELECT user_id FROM User WHERE email=?", givenEmail,  //check if email is taken
                            function(err, users, field){
                                if(users.length === 0){
                                    connection.query("SELECT username FROM Credentials WHERE username=?", givenUsername, function(err,usernames, field){  //check if username is taken
                                        if(usernames.length===0){
                                            if(passwordValidate(givenPassword)){  //if password is valid
                                                if(givenPassword === givenResubmitted){  //if password and confirmed password match
                                                    const hash = bcrypt.hashSync(givenPassword, 10);

                                                    connection.query(`INSERT INTO User (email,first_name, last_name) VALUES ('${givenEmail}','${givenFirstName}', '${givenLastName}')`, function(err, insertedUser){
                                                        if(err){
                                                            res.status(500).json(err);
                                                        }
                                                        else{
                                                            console.log('User Created');
                                                            console.log(insertedUser.insertId); //user id of newly created user
                                                            userId = insertedUser.insertId;
                                                            connection.query(`INSERT INTO Account (user_id)  VALUES  ('${insertedUser.insertId}')`, //create new account in database with returned user_id //registered user entry and profile automatically created
                                                            function(err,account){
                                                                if(err){
                                                                    res.status(500).json(err);
                                                                }
                                                                console.log('Account Created');
                                                                console.log(account.insertId); //account id of newly created account
                                                                connection.query(`INSERT INTO Credentials (acct_id, username, password) VALUES ('${account.insertId}', '${givenUsername}', '${hash}')`, 
                                                                function(err,insertedCredentials){
                                                                    if(err){
                                                                        res.status(500).json(err);
                                                                    }
                                                                    console.log('Credentials Created');
                                                                    console.log(insertedCredentials.insertId);
                                                                    connection.query(`INSERT INTO Business (name, phone_num, reg_user_id) VALUES ('${givenBusinessName}', '${givenPhoneNumber}', (SELECT reg_user_id FROM RegisteredUser WHERE user_id= ${userId}))`,
                                                                    function(err, insertedBusiness){
                                                                        if(err){
                                                                            console.log(err);
                                                                            // res.status(500).json(err);
                                                                        }
                                                                        console.log('Business Created');
                                                                        console.log(insertedBusiness.insertId);
                                                                        connection.query(`INSERT INTO Shelter (business_id) VALUES ('${insertedBusiness.insertId}')`,
                                                                        function(err, insertedShelter){
                                                                            if(err){
                                                                                console.log(err);
                                                                                // res.status(500).json(err);
                                                                            }
                                                                            console.log('Shelter Created');
                                                                            console.log(insertedShelter.insertId);
                                                                        })

                                                                    })
                                                                })
                                                            }); 
                                                            res.status(200).json(insertedUser);
                                                        }
                                                    })
                                                }else{
                                                    console.log("Passwords do not match.");
                                                    res.status(400).json("passwords not matching");
                                                }
                                            }else{
                                                console.log("Password must have SUCH AND SUCH values")
                                                res.status(400).json("password requirements");
                                            }
                                        }
                                        else if(usernames.length != 0){  //if username is taken
                                            console.log("Username already taken")
                                            res.status(400).json("exists");
                                        }
                                    })
                                    
                                } else if(users.length != 0){
                                    console.log("User does exist")
                                    res.status(400).json("exists");
                                }
                            })
})

module.exports = router