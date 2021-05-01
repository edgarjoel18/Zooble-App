const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get('/api/business-types', (req,res) =>{
    connection.query("SELECT * FROM BusinessType ORDER BY business_type_name", function(err, businessTypes){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(businessTypes)
        res.status(200).json(businessTypes);
    })
})

router.get('/api/pet-types', (req,res) =>{
    connection.query("SELECT * FROM PetType ORDER BY pet_type_name", function(err, petTypes){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(petTypes)
        res.status(200).json(petTypes);
    })
})

module.exports = router