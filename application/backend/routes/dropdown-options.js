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

router.get('/api/dog-breeds', (req,res) =>{
    connection.query("SELECT * FROM DogBreed ORDER BY dog_breed_name", function(err, dogBreeds){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(dogBreeds)
        res.status(200).json(dogBreeds);
    })
})

router.get('/api/cat-breeds', (req,res) =>{
    connection.query("SELECT * FROM CatBreed ORDER BY cat_breed_name", function(err, catBreeds){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(catBreeds)
        res.status(200).json(catBreeds);
    })
})

router.get('/api/ages', (req,res) =>{
    connection.query("SELECT * FROM Age ORDER BY age_id", function(err, ages){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(ages)
        res.status(200).json(ages);
    })
})

router.get('/api/sizes', (req,res) =>{
    connection.query("SELECT * FROM Size ORDER BY size_id", function(err, sizes){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(sizes)
        res.status(200).json(sizes);
    })
})

router.get('/api/colors', (req,res) =>{
    connection.query("SELECT * FROM Color ORDER BY color_name", function(err, colors){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        console.log(colors)
        res.status(200).json(colors);
    })
})


module.exports = router