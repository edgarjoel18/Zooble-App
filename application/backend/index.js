const express = require("express");

const mysql = require('mysql2');

const session = require('express-session');
const cookieParser = require('cookie-parser');

//DB Connection
// const connection = require('./db');

//Routes
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const signupRouter = require('./routes/sign-up.js');
const searchRouter = require('./routes/search.js');
const dropdownRouter = require('./routes/dropdown-options.js');
const uploadPostRouter = require('./routes/upload-post.js');
const editPostRouter = require('./routes/edit-post.js');
const app = express();

// app.use(cookieParser());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(session({
     key: "userId",
     secret: "zooble",
     resave: false,
     saveUninitialized: false,
     cookie: {
         expires: 60 * 60 * 24 * 1000, //1 day expiration
     }
 }))

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});

//Sign Up
app.use(signupRouter);

//Login
app.use(loginRouter);

//Logout
app.use(logoutRouter);

//Search
app.use(searchRouter);

//Dropdown Options
app.use(dropdownRouter)

//upload Post
app.use(uploadPostRouter)

//edit Post
app.use(editPostRouter)











