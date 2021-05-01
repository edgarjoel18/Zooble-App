const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get("/api/search", (req,res) =>{
    console.log("/search");
    if(req.query.searchTerm){
        var name = req.query.searchTerm.toLowerCase();
    }
    
    console.log("Name: ",name);
    var category = req.query.searchCategory
    console.log("Category: ",category);
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
        console.log("Category == Businesses")
        connection.query(
            `SELECT * 
            FROM Business
            LEFT JOIN Shelter
            ON Business.business_id = Shelter.business_id
            WHERE LOWER(name) LIKE '%${name}%'
            AND Shelter.business_id IS NULL
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
                        "business_id":row.business_id,
                        "reg_user_id":row.reg_user_id,
                        "name": row.name
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
            FROM Business
            INNER JOIN Shelter
            ON Business.business_id = Shelter.business_id
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
                        "shelter_id":row.shelter_id,
                        "reg_user_id":row.reg_user_id,
                        "name": row.name,
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