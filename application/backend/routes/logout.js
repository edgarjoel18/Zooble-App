const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/logout",(req,res) =>{
    console.log("/api/logout")
    req.session.destroy();
    res.send({loggedIn:false})
})

module.exports = router