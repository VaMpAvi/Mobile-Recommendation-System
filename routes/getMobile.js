require('dotenv').config();
const express=require('express');
const app=express.Router();
const bodyparser=require('body-parser');
const urlencoder=bodyparser.urlencoded({extended :false});
const bcrypt=require('bcrypt');
const Mobile=require('../models/phone_data');
const multer=require('multer');
const jwt=require('jsonwebtoken');
// const checkAuth =require('./checkAuth');
// const { session } = require('passport');
app.use(express.json());

const storage =multer.diskStorage({
    destination :function(req,file,cb){
  cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
  cb(null, "mobile"+Date.now().toString()+".jpg");
    }
  })
  
  const fileFilter=function(req,file,cb){
    if(imageMimeTypes.includes(file.mimetype))
    cb(null,true);
    else
    cb(null,false);
  }
  const upload=multer({storage:storage,
  limits:{
    fileSize:1024*1024*12
  },
  fileFilter:fileFilter
  });
  const imageMimeTypes = ['image/jpeg', 'image/png','image/jpg']

  app.post('/sell', upload.single('cover'), async function(req,res){

    {
     console.log(req.file);
    const mobile=new Mobile({
      mobile_name : req.body.mobile_name,
      price:req.body.price,
      ram:req.body.ram,
      coverImage:req.file.path,
      rom: req.body.rom
    });
    await mobile.save();
      res.redirect('/');
  }
//   res.redirect('/contact');
  });
  // { $regex: '^' + search_text, $options: 'i' }
app.get('/search/auto',function(req,res){
    console.log("search",req.query.search);
    Mobile.find({mobile_name:{ $regex: '^' + req.query.search, $options: 'i' }}, function (err, docs) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
          console.log(docs);
          res.json(docs);
      } 
  })
  });

  app.get('/search',function(req,res){
      console.log(req.query.search);
    Mobile.find({mobile_name:{ "$regex" : req.query.search , "$options" : "i"}}, function (err, docs) { 
      if (err){ 
          console.log(err); 
      } 
      else{ 
        // data = {docs,user :false};
        console.log(docs);
          res.render('display',{data : {docs}});
      } 
  })
  });

  app.get('/find', function(req, res){
      res.render('find');
  })


  app.get('/desc', function(req, res){
    console.log(req.query.name);
    Mobile.findOne({mobile_name:req.query.name}, (err, docs) =>{
      if (err){ 
        console.log(err); 
    } 
    else{ 
      // data = {docs,user :false};
      console.log(docs);
      res.render('desc', {data:{docs}});
    } 
    })

  })
  module.exports = app;