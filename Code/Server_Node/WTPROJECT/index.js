const express = require('express')
const controller = require('./controller/user.js')
const app = express()
const bp = require('body-parser')
const router = express.Router();
const route = require('./router/index.js')
const user = require('./models/loginModel')
const mongoose = require('mongoose');
var crypto=require('crypto');
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

app.get('/sayhello',function(req,res){
    res.send("Hi you have reached to server");
})
app.get('/signup',function(req,res){
    res.sendfile('signup.html');
})

app.get('/login',function(req,res){
    res.sendfile('login.html');
})

app.use('/api',route(router));

app.listen(3000, "0.0.0.0", function (err) {
    if (!err) {
        console.log("Server up on 3000!");
    }
})