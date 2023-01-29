const express = require('express');
const app = express.Router();
const bodyparser = require('body-parser');
const urlencoder = bodyparser.urlencoded({ extended: false });
const bcrypt = require('bcrypt');
const User = require('../models/userprofile');
require('dotenv').config();
// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
app.use(express.json());

app.get('/', function(req, res){
    req.session.exists = false;
    if(req.session.pass)
    res.render('Login',{data:{user:true}});
    else
    res.render('Login', {data:{user:false}});
})

app.post('/login', urlencoder, async function (req, res) {
    User.exists({ email: req.body.email }, function (err, value) {
        // console.log('value');
        // User.findOne({email: req.body.email}, async function (err, data){
        //     console.log(data.password);
        // })
        if (value) {

            User.findOne({ email: req.body.email }, async function (err, data) {
                if(data.password != undefined){
                if (err)
                    throw err;
                if (await bcrypt.compare(req.body.password, data.password)) {
                    req.session.user = data.email;                                                       
                    const user = { name: data.email };
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    console.log(accessToken);
                    res.cookie("SessionId", accessToken);
                    res.redirect('/');
                }
                else{
                    req.session.pass = true;
                    console.log("incorrect");
                    res.redirect('/signin');
                }
            }
            else
            {
                res.send("Login with google");
            }
            });
        }
        else {
            console.log("NOT FOUND");
            res.redirect('/signin');
        }
    });

});
module.exports = app;