const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get("/api/logout",(req,res) =>{
    req.session.loggedin = false;
    req.session.username = null;
    res.send({loggedIn:false})
})

module.exports = router