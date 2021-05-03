const express = require('express');
const router = express.Router();

const connection = require('../db');

function distance(lat1, lat2, lon1, lon2) //for calculating distance between two lat,lng
{
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
}

router.get("/api/search", (req,res) =>{
    console.log("/search");
    if(req.query.searchTerm){
        var name = req.query.searchTerm.toLowerCase();
    }
    else{
        name= '';
    }
    
    console.log("Name: ",name);
    var category = req.query.searchCategory
    console.log("Category: ",category);
    var requestedSearchResults = {searchResults:[]}

    let givenLatitude = req.query.searchLatitude;
    let givenLongitude = req.query.searchLongitude;
    console.log("Given Latitude: ",givenLatitude);
    console.log("Given Longitude: ", givenLongitude);

    let preferredSearchDistance = req.query.searchDistance;
    console.log("Preferred Search Distance: ", preferredSearchDistance);

    // console.log("Search Biz Categories: ", req.query.searchBizCategories);

    if(category == 'Pets'){
        let requestedPetTypes = req.query.searchPetTypes;
        let requestedPetColors = req.query.searchPetColors;
        let requestedPetSizes = req.query.searchPetSizes;
        let requestedPetAges =  req.query.searchPetAges;

        let query = '';

        if(requestedPetTypes[0] == undefined && requestedPetColors[0] == undefined && requestedPetSizes[0] == undefined && requestedPetAges[0] == undefined){
            query = 
            `SELECT * 
            FROM ((Pet
            LEFT JOIN Age
            ON Pet.age_id = Age.age_id)
            LEFT JOIN Size
            ON Pet.size_id = Size.size_id)
            WHERE LOWER(name) LIKE '%${name}%'
            `;
        }
        else{
            query = 
            `SELECT * 
            FROM ((Pet
            LEFT JOIN Age
            ON Pet.age_id = Age.age_id)
            LEFT JOIN Size
            ON Pet.size_id = Size.size_id)
            WHERE LOWER(name) LIKE '%${name}%'
            `;

            if(requestedPetTypes[0] !== undefined){
                query += 'AND ('
                for(let i = 0; i < requestedPetTypes.length; i++){ //build sql query for pet types
                    if(i == (requestedPetTypes.length - 1))
                        query += 'Pet.pet_type_id = ' + requestedPetTypes[i] + ' OR ';
                    else
                        query += 'Pet.pet_type_id = ' + requestedPetTypes[i];
                }
                query += ")"
            }
            // if(requestedPetColors[0] !== undefined){
            //     for(let i = 0; i < requestedPetColors.length; i++){ //build sql query for pet types
            //         if(i == (requestedPetColors.length - 1))
            //             query += 'Pet.pet_type_id = ' + requestedPetColors[i] + ' OR ';
            //         else
            //             query += 'Pet.pet_type_id = ' + requestedPetColors[i];
            //     }
            //     query += ")"
            // }
            if(requestedPetAges[0] !== undefined){
                query += 'AND ('
                for(let i = 0; i < requestedPetAges.length; i++){ //build sql query for pet types
                    if(i == (requestedPetAges.length - 1))
                        query += 'Pet.age_id = ' + requestedPetAges[i] + ' OR ';
                    else
                        query += 'Pet.age_id = ' + requestedPetAges[i];
                }
                query += ")"
            }
            if(requestedPetSizes[0] !== undefined){
                query += 'AND ('
                for(let i = 0; i < requestedPetSizes.length; i++){ //build sql query for pet types
                    if(i == (requestedPetSizes.length - 1))
                        query += 'Pet.size_id = ' + requestedPetSizes[i] + ' OR ';
                    else
                        query += 'Pet.size_id = ' + requestedPetSizes[i];
                }
                query += ")"
            }

            query += ");"
            console.log(query);
        }

        connection.query(
            `SELECT * 
            FROM ((Pet
            LEFT JOIN Age
            ON Pet.age_id = Age.age_id)
            LEFT JOIN Size
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
        let givenBizCategories = req.query.searchBizCategories;
        console.log("Given Biz Categories: ", givenBizCategories);
        console.log(typeof givenBizCategories);

        let query = '';


        if(givenBizCategories[0] !== 'undefined'){
            query =             
            `SELECT * 
            FROM Business
            LEFT JOIN Shelter
            ON Business.business_id = Shelter.business_id
            LEFT JOIN Address
            ON Business.reg_user_id = Address.reg_user_id
            LEFT JOIN Commerce
            ON Business.business_id = Commerce.business_id
            WHERE LOWER(name) LIKE '%${name}%'
            AND Shelter.business_id IS NULL
            AND (
            `
            for(let i = 0; i < givenBizCategories.length; i++){  //build sql query with filters
                console.log("Given Biz Categories [", i,"]: " , givenBizCategories[i]);
                console.log(typeof givenBizCategories[i]);
                if(i == (givenBizCategories.length - 1))
                    query += 'Commerce.business_type_id = ' + givenBizCategories[i];
                else
                    query += 'Commerce.business_type_id = ' + givenBizCategories[i] + ' OR ';
                    
            }
            query += ");"
            console.log(query);
        }
        else{
            query =             
            `SELECT * 
            FROM Business
            LEFT JOIN Shelter
            ON Business.business_id = Shelter.business_id
            LEFT JOIN Address
            ON Business.reg_user_id = Address.reg_user_id
            WHERE LOWER(name) LIKE '%${name}%'
            AND Shelter.business_id IS NULL
            `;
        }
        console.log('Query: ',query);

        connection.query(query,
            function(err, result) {
            if(err){
                throw err;
            } 
            else {
              
                let offset = 0;  //let offset equal page number value * 10
                for(let i = 0; i < result.length; i++){
                    // if(i < offset)  //if these search results were already given than skip adding to returned search results
                    //     continue;
                    var row = result[i];
                    // console.log(row);
                    // console.log(row.name);
                    // console.log(row.size_id);
                    // console.log(row.age_id);
                    const proximityInMiles = distance(row.latitude, givenLatitude, row.longitude, givenLongitude);
                    console.log("Proximity in Miles: ", proximityInMiles);
                    if(proximityInMiles < preferredSearchDistance){
                        requestedSearchResults.searchResults.push({
                            "business_id":row.business_id,
                            "reg_user_id":row.reg_user_id,
                            "name": row.name,
                            "lat": row.latitude,
                            "lng": row.longitude
                        });

                    }
                    if(requestedSearchResults.searchResults.length == 10)
                        break;
                }  
        
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }       
        });
    }
    else if(category == 'Shelters'){
        let givenPetTypes = req.query.searchPetTypes;

        let query = '';

        if(givenPetTypes[0] !== 'undefined'){
            query =
            `SELECT *
            FROM Business
            INNER JOIN Shelter
            ON Business.business_id = Shelter.business_id
            LEFT JOIN Address
            ON Business.reg_user_id = Address.reg_user_id
            WHERE LOWER(name) LIKE '%${name}%'
            AND (
            `

            for(let i = 0; i < givenPetTypes.length; i++){  //build sql query with filters
                console.log("Given Pet Types [", i,"]: " , givenPetTypes[i]);
                console.log(typeof givenPetTypes[i]);
                if(i == (givenPetTypes.length - 1))
                    query += 'Commerce.business_type_id = ' + givenPetTypes[i];
                else
                    query += 'Commerce.business_type_id = ' + givenPetTypes[i] + ' OR ';
                    
            }
            query += ");"
            console.log(query);
        }
        else{
            query =
            `SELECT *
            FROM Business
            INNER JOIN Shelter
            ON Business.business_id = Shelter.business_id
            LEFT JOIN Address
            ON Business.reg_user_id = Address.reg_user_id
            WHERE LOWER(name) LIKE '%${name}%'
            `
        }
        connection.query(
            `SELECT *
            FROM Business
            INNER JOIN Shelter
            ON Business.business_id = Shelter.business_id
            LEFT JOIN Address
            ON Business.reg_user_id = Address.reg_user_id
            WHERE LOWER(name) LIKE '%${name}%'
            LIMIT 10
            `, 
            function(err, result) {
            if(err){
                throw err;
            } else {
                console.log("Result: ",result);
              
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    // console.log(row);
                    // console.log(row.name);
                    // console.log(row.size_id);
                    // console.log(row.age_id);
                    const proximityInMiles = distance(row.latitude, givenLatitude, row.longitude, givenLongitude);
                    console.log("Proximity in Miles: ", proximityInMiles);
                    if(proximityInMiles < preferredSearchDistance){
                        requestedSearchResults.searchResults.push({
                            "shelter_id":row.shelter_id,
                            "reg_user_id":row.reg_user_id,
                            "name": row.name,
                            "lat": row.latitude,
                            "lng": row.longitude
                        });
                    }
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Pet Owners'){
        console.log('searching through RegisteredPetOwner')
        connection.query(
            `SELECT User.first_name, RegisteredUser.reg_user_id
            FROM User
            LEFT JOIN RegisteredUser
            ON User.user_id = RegisteredUser.user_id
            LEFT JOIN Business
            ON RegisteredUser.reg_user_id = Business.reg_user_id
            WHERE LOWER(User.first_name) LIKE '%${name}%'
            AND Business.business_id IS NULL
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
                        // "reg_pet_owner_id":row._id,
                        "reg_user_id":row.reg_user_id,
                        "name": row.first_name,
                        // "profile_pic": row.profile_pic
                    });
                  });
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }

});

module.exports = router