const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get("/api/search", (req,res) =>{
    console.log("/search");
    if(req.query.searchTerm){
        var name = req.query.searchTerm.toLowerCase();
    }
    
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

module.exports = router