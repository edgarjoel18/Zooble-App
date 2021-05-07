const express = require('express');
const connection = require('../db');
const router = express.Router();

router.post("/api/create-pet-profile",(req,res)=>{
    console.log("POST /api/create-pet-profile");
    console.log("req.body: ", req.body);

    // if(req.body.dogBreed.length != 0){
    //     console.log("Its a dog!")
    // }
    // else if(req.body.catBreed.length != 0){
    //     console.log("Its a cat!")
    // }
    // else{
    //     console.log("Its another pet!")
    // }

    //MAKE THIS INTO A TRANSACTION LATER
    connection.query(
         `INSERT INTO Pet
         (age_id, size_id, reg_user_id, name)
         VALUES ('${req.body.age.value}','${req.body.size.value}','${req.session.reg_user_id}','${req.body.name}')`,
         function(err, userPet){
             if(err){
                 console.log(err);
             }
             else{
                 console.log("Inserted Pet successfully");
                console.log(userPet);
                 connection.query(
                     `INSERT INTO Profile
                      (display_name,about_me, account_id, pet_id)
                      VALUES (req.body.name, '', 
                      (SELECT Account.account_id
                        FROM Account
                        JOIN RegisteredUser ON RegisteredUser.reg_user_id = '${req.session.reg_user_id}'
                        JOIN Account ON Account.user_id = RegisteredUser.user_id),
                      '${userPet.insertId}')`,
                      function(err, result){
                          if(err){
                              console.log(err);
                          }
                          else{
                              console.log(result);
                          }
                      }
                 )

                
                for(let i = 0; i < req.body.color.length; i++){
                    connection.query(
                        `INSERT INTO PetColor (pet_id,color_id) VALUES ('${userPet.insertId}','${req.body.color[i].value}')`,
                         function(err, result){
                             if(err){
                                 console.log(err);
                             }
                             else{
                                 if(req.body.dogBreed.length != 0 && req.body.petType.label == 'Dog'){
                                    connection.query(`INSERT INTO Dog (pet_id) VALUES ('${userPet.insertId}')`,
                                    function(err, insertedDog){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            console.log("Inserted Dog successfully");
                                            console.log(insertedDog);
                                            for(let i = 0; i < req.body.dogBreed.length; i++){
                                                connection.query(`INSERT INTO DogBreeds (dog_id, dog_breed_id) VALUES ('${insertedDog.insertId}','${req.body.dogBreed[0]}')`,
                                                    function(err,insertedDogBreed){
                                                        if(err){
                                                            console.log(err);
                                                        }
                                                        else{
                                                            console.log(req.body.dogBreed[i].label, " inserted");
                                                        }
                                                })
                                            }
                                        }
                                    })

                                 }
                                 else if(req.body.catBreed.length != 0 && req.body.petType.label == 'Cat'){
                                    connection.query(`INSERT INTO Cat (pet_id) VALUES ('${userPet.insertId}')`,
                                    function(err, insertedCat){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            console.log("Inserted Cat successfully");
                                            console.log(insertedCat);
                                            for(let i = 0; i < req.body.catBreed.length; i++){
                                                `INSERT INTO CatBreeds (cat_id, cat_breed_id) VALUES ('${insertedDog.insertId}','${req.body.dogBreed[0]}')`,
                                                function(err,insertedDogBreed){
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                    else{
                                                       console.log(req.body.dogBreed[i].label, " inserted");
                                                    }
                                                }
                                            }
                                        }
                                    })
                                 }
                                 else{
                                 }
                             }
                         }
                    )
                 }
             }
             res.status(200).json(userPet);
         })
})

module.exports = router