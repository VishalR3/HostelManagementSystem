const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const userSchema = require('./schema/users');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb+srv://root:'+process.env.MONGO_PASS+'@cluster0.aboy9.mongodb.net/HMS?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const User = mongoose.model('User',userSchema);

app.use(session({
  secret:process.env.SESS_SECRET,
  resave:false,
  saveUninitialized:false,
}))
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
  res.render(__dirname +'/pages/index.ejs');
})
app.post('/',(req,res)=>{
  const query = User.where({roll_number:req.body.roll_number, password:req.body.password});
  query.findOne((err,user)=>{
    if(err){
      console.log(err);
      res.redirect('/');
    }
    if(user){
      req.session.user = user;
      res.redirect('/profile');
    }
  })
})

app.get('/profile',(req,res)=>{
  res.render(__dirname +'/pages/profile.ejs',{user :req.session.user});
})
app.get('/signup',(req,res)=>{
  res.render(__dirname+'/pages/signup.ejs');
})
app.post('/signup',(req,res)=>{
  let user = new User({
    name : req.body.name,
    roll_number : req.body.roll_number,
    password : req.body.password,
    room_number: req.body.room_number,
    hall : req.body.hall,
    status : 1,
    occupant_from : req.body.occupant_from
  });
  user.save();
  res.redirect('/profile');
})

app.listen(port,()=>{
  console.log(`App Started on http://localhost:${port}`);
})