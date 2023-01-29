
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const signup=new schema({
    Firstname:String,
    email : String,
    password : String,
});

const user=mongoose.model('User',signup);

module.exports=user;