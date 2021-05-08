const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get('/api/business-hours', (req,res)=>{
    connection.query(
        `SELECT sun_open, sun_close,mon_open, mon_close,tue_open, tue_close,wed_open, wed_close,thu_open, thu_close,fri_open, fri_close, sat_open, sat_close
         FROM HoursOfOperation
         JOIN Business ON HoursOfOperation.business_id = Business.business_id
         JOIN RegisteredUser ON Business.reg_user_id =  RegisteredUser.reg_user_id
         JOIN Account ON RegisteredUser.user_id = Account.user_id
         JOIN Profile ON Profile.profile_id = '${req.query.profileID}'
         WHERE Account.account_id = Profile.account_id
        `, 
        function(err,hours){
            if(err){
                console.log(err)
                res.status(500).json(err);
            }
            else{
                console.log("hours: ",hours)
                res.status(200).json(hours);
            }
        })
})

router.get('/api/business-address', (req,res)=>{
    console.log('GET /api/business-address');
    connection.query(
        `SELECT address
         FROM Address
         JOIN RegisteredUser ON Address.reg_user_id =  RegisteredUser.reg_user_id
         JOIN Account ON RegisteredUser.user_id = Account.user_id
         JOIN Profile ON Profile.profile_id = '${req.query.profileID}'
         WHERE Account.account_id = Profile.account_id
        `, 
        function(err,address){
            if(err){
                console.log(err)
                res.status(500).json(err);
            }
            else{
                console.log("address: ",address)
                res.status(200).json(address[0]);
            }
        })
})

router.get('/api/business-phone-number', (req,res)=>{
    console.log('GET /api/business-address');
    connection.query(
        `SELECT phone_num
         FROM Business
         JOIN RegisteredUser ON Business.reg_user_id =  RegisteredUser.reg_user_id
         JOIN Account ON RegisteredUser.user_id = Account.user_id
         JOIN Profile ON Profile.profile_id = '${req.query.profileID}'
         WHERE Account.account_id = Profile.account_id
        `, 
        function(err,number){
            if(err){
                console.log(err)
                res.status(500).json(err);
            }
            else{
                console.log("phone number: ",number)
                res.status(200).json(number[0]);
            }
        })
})

module.exports = router