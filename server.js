const express=require('express');
const app = express();
const bodyparser=require('body-parser');
const path=require('path');
const fs=require('fs');
const urlencoder=bodyparser.urlencoded({extended :false});
const mongoose=require('mongoose');
const passport=require('passport');
const cookie=require('cookie-session');
var cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
app.set('view engine', 'ejs') ;
app.use('/assests',express.static('assests'));
app.use('/uploads',express.static('uploads'))
app.use(session({secret: "Shh, its a secret!"}));
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true }, {useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const getPhone = require('./routes/getMobile');

const Mobile = require('./models/phone_data');
let phones, ret, ret2;
async function getPhones(req, res, next){
    await Mobile.find({}, async function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
           
          ret = docs;
 
            // res.send(docs[0]);
        } 
    }).clone(); 
    next();
    }
app.get('/',getPhones,  function (req, res) {
    // console.log(ret);
    phones = ret.slice(0,1);
    // if(req.session.user)
    // res.redirect('/');
    // else{
    //     var data=[false,false];
    //     if(req.session.exists)
    //     data[0]=true;
    //     if(req.session.pass)
    //     data[1]=true;
    //     res.render('signup',{user:data});
    // }
    res.render('index',{data:{phones}});
    });
    app.get('/sell',getPhones,  function (req, res) {
        // console.log(ret);
        if(req.session.user){
        phones = ret.slice(0,3);
      
        res.render('sell');
        }
        else{
            res.redirect('/signin');
        }
        });
        app.get('/compare',  function (req, res) {
            Mobile.findOne({mobile_name:req.query.dev1}, (err, docs) =>{
                if(err)
                console.log(err);
                else{
                        ret = docs;
                }
            });

            Mobile.findOne({mobile_name:req.query.dev2}, (err, docs) =>{
                if(err)
                console.log(err);
                else{
                        ret2 = docs;
                }
            });
           var data = {ret, ret2};
           res.json(data);
            // res.render('comapre', {data:{ret,ret2}});
            });
        
            app.get('/find',function(req, res){
                res.render('find');
            });


            app.get('/buy',function(req, res){
             
                res.render('comapre');
            });
            // app.get('/display', function(req, res){
            //     res.render('display');
            // });

app.use('/signup',signupRoute);
app.use('/signin',loginRoute);
app.use('/getPhone',getPhone);
app.listen(process.env.PORT || 3000)