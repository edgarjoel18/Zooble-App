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

    let givenPage = req.query.searchPage;

    console.log("Given Page: ", givenPage);

    // console.log("Search Biz Categories: ", req.query.searchBizCategories);

    if(category == 'Pets'){
        let requestedPetTypes = req.query.searchPetTypes;
        let requestedPetColors = req.query.searchPetColors;
        let requestedPetSizes = req.query.searchPetSizes;
        let requestedPetAges =  req.query.searchPetAges;

        let query = '';
        if((requestedPetTypes  && requestedPetTypes !== undefined) || (requestedPetColors  && requestedPetColors !== undefined) || (requestedPetSizes  && requestedPetSizes !== undefined) || (requestedPetAges  && requestedPetAges !== undefined)){
            query = 
            `SELECT * 
             FROM Pet
             LEFT JOIN Age ON Pet.age_id = Age.age_id
             LEFT JOIN Size ON Pet.size_id = Size.size_id
             LEFT JOIN Dog ON Pet.pet_id = Dog.pet_id
             LEFT JOIN Cat On Pet.pet_id = Cat.pet_id
             WHERE LOWER(name) LIKE '%${name}%'`;

            if(requestedPetTypes !== undefined){
                query += ' AND ('
                for(let i = 0; i < requestedPetTypes.length; i++){ //build sql query for pet types
                    if(i == (requestedPetTypes.length - 1))
                        query += 'Pet.type_id = ' + requestedPetTypes[i] ;
                    else
                        query += 'Pet.type_id = ' + requestedPetTypes[i]  + ' OR ';
                }
                query += ")"
            }
            if(requestedPetColors !== undefined){
                query += ' AND '
                for(let i = 0; i < requestedPetColors.length; i++){ //build sql query for pet types
                     if(i == (requestedPetColors.length - 1))
                        query +=  `(SELECT PetColor.color_id FROM PetColor 
                            JOIN Pet ON Pet.pet_id = PetColor.pet_id
                            JOIN Color ON Color.color_id =  PetColor.color_id) = ` + requestedPetColors[i];
                     else
                         query += 'PetColor.color_id = ' + requestedPetColors[i]  + ' OR ';
                 }
                 query += ")"
            }
            if(requestedPetAges !== undefined){
                query += 'AND ('
                for(let i = 0; i < requestedPetAges.length; i++){ //build sql query for pet types
                    if(i == (requestedPetAges.length - 1))
                        query += 'Pet.age_id = ' + requestedPetAges[i];
                    else
                        query += 'Pet.age_id = ' + requestedPetAges[i]  + ' OR ';
                }
                query += ")"
            }
            if(requestedPetSizes !== undefined){
                query += 'AND ('
                for(let i = 0; i < requestedPetSizes.length; i++){ //build sql query for pet types
                    if(i == (requestedPetSizes.length - 1))
                        query += 'Pet.size_id = ' + requestedPetSizes[i];
                    else
                        query += 'Pet.size_id = ' + requestedPetSizes[i]  + ' OR ';
                }
                query += ")"
            }

            query += ` 
            LIMIT 10                       
            OFFSET ${(givenPage-1)*10}`;
            console.log(query);
        }
        else{
            query = 
            `SELECT *,
            (3959 * acos(cos(radians('${givenLatitude}'))* cos(radians(Address.latitude))* cos(radians(Address.longitude) - radians('${givenLongitude}')) + sin(radians(${givenLatitude})) * sin(radians(Address.latitude)))) as distance
            FROM Pet
            LEFT JOIN Profile ON Profile.pet_id = Pet.pet_id
            LEFT JOIN Address ON Address.reg_user_id = Pet.reg_user_id
            HAVING LOWER(name) LIKE '%${name}%'
            AND distance <  ${preferredSearchDistance}
            LIMIT 10 
            OFFSET ${(givenPage-1)*10}`;
        }
        

        connection.query(query, 
            function(err, results) {
            if(err){
                throw err;
            } else {
                requestedSearchResults = results;
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


        if(givenBizCategories && givenBizCategories[0] !== 'undefined'){
            query =             
            `SELECT *,
            (3959 * acos(cos(radians('${givenLatitude}'))* cos(radians(Address.latitude))* cos(radians(Address.longitude) - radians('${givenLongitude}')) + sin(radians(${givenLatitude})) * sin(radians(Address.latitude)))) as distance
            FROM Business
            LEFT JOIN Commerce ON Business.business_id = Commerce.business_id
            LEFT JOIN Shelter ON Business.business_id = Shelter.business_id
            LEFT JOIN Address ON Business.reg_user_id = Address.reg_user_id
            JOIN RegisteredUser ON Business.reg_user_id = RegisteredUser.reg_user_id
            JOIN Account ON RegisteredUser.user_id = Account.user_id
            LEFT JOIN Profile ON Account.account_id = Profile.account_id
            HAVING Shelter.business_id IS NULL 
            AND LOWER(name) LIKE '%${name}%'
            AND distance <  ${preferredSearchDistance}
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
             //make sure to start from selected page and limit results
            query += `) 
            LIMIT 10                       
            OFFSET ${(givenPage-1)*10};`
            console.log(query);
        }
        else{
            query =             
            `SELECT *,
            (3959 * acos(cos(radians('${givenLatitude}'))* cos(radians(Address.latitude))* cos(radians(Address.longitude) - radians('${givenLongitude}')) + sin(radians(${givenLatitude})) * sin(radians(Address.latitude)))) as distance
            FROM Business
            LEFT JOIN Shelter ON Business.business_id = Shelter.business_id
            LEFT JOIN Address ON Business.reg_user_id = Address.reg_user_id
            JOIN RegisteredUser ON Business.reg_user_id = RegisteredUser.reg_user_id
            JOIN Account ON RegisteredUser.user_id = Account.user_id
            LEFT JOIN Profile ON Account.account_id = Profile.account_id
            HAVING Shelter.business_id IS NULL 
            AND LOWER(name) LIKE '%${name}%'
            AND distance <  ${preferredSearchDistance}
            LIMIT 10 
            OFFSET ${(givenPage-1)*10}`;
        }
        console.log('Query: ',query);

        connection.query(query,
            function(err, results) {
            if(err){
                throw err;
            } 
            else {
                requestedSearchResults = results;
                // console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }       
        });
    }
    else if(category == 'Shelters'){
        let givenPetTypes = req.query.searchPetTypes;

        let query = '';

        if(givenPetTypes && givenPetTypes[0] !== 'undefined'){
            query =
            `SELECT *
            FROM Business
            JOIN Shelter ON Business.business_id = Shelter.business_id
            LEFT JOIN Address ON Business.reg_user_id = Address.reg_user_id
            JOIN RegisteredUser ON Business.reg_user_id = RegisteredUser.reg_user_id
            JOIN Account ON RegisteredUser.user_id = Account.user_id
            LEFT JOIN Profile ON Account.account_id = Profile.account_id
            AND LOWER(name) LIKE '%${name}%'
            AND distance <  ${preferredSearchDistance}
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
            query += `) 
            LIMIT 10                       
            OFFSET ${(givenPage-1)*10};`
            console.log(query);
        }
        else{
            query = 
            `SELECT *,
            (3959 * acos(cos(radians('${givenLatitude}'))* cos(radians(Address.latitude))* cos(radians(Address.longitude) - radians('${givenLongitude}')) + sin(radians(${givenLatitude})) * sin(radians(Address.latitude)))) as distance
            FROM Business
            JOIN Shelter ON Business.business_id = Shelter.business_id
            LEFT JOIN Address ON Business.reg_user_id = Address.reg_user_id
            JOIN RegisteredUser ON Business.reg_user_id = RegisteredUser.reg_user_id
            JOIN Account ON RegisteredUser.user_id = Account.user_id
            LEFT JOIN Profile ON Account.account_id = Profile.account_id
            HAVING LOWER(name) LIKE '%${name}%'
            AND distance <  ${preferredSearchDistance}
            LIMIT 10 
            OFFSET ${(givenPage-1)*10}`
        }
        connection.query(query, 
            function(err, results) {
            if(err){
                throw err;
            } else {
                requestedSearchResults = results;
                console.log(requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }
    else if(category == 'Pet Owners'){
        console.log('searching through RegisteredPetOwner')
        connection.query(
            `SELECT *
            FROM Profile
            JOIN Account ON Profile.account_id = Account.account_id
            JOIN RegisteredUser ON Account.user_id = RegisteredUser.user_id
            LEFT JOIN Business ON RegisteredUser.reg_user_id = Business.reg_user_id
            JOIN Credentials ON Account.account_id = Credentials.acct_id
            WHERE Business.business_id IS NULL 
            AND Profile.pet_id IS NULL
            AND ((LOWER(Profile.display_name) LIKE '%${name}%') OR (LOWER(Credentials.username) LIKE '%${name}'))
            `, 
            function(err, results) {
            if(err){
                throw err;
            } else {
                requestedSearchResults = results
                console.log("Pet Owner Results: ", requestedSearchResults);
                res.json(requestedSearchResults);
            }
        });
    }

});

module.exports = router