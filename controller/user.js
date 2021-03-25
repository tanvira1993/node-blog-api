const bcrypt = require('bcryptjs')
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/config')

exports.signup = (req,res) =>{
    const {name,email,password} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"please fill all the fields!"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(parsedpassword=>{
              const user = new User({
                  email,
                  password:parsedpassword,
                  name,
              })      
              user.save()
              .then(user=>{
                  res.json({data:user,message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
  }

  exports.login= (req,res) =>{
        const {email,password} = req.body
        if(!email || !password){
           return res.status(422).json({error:"please fill email or password"})
        }
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
               return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(match=>{
                if(match){
                   const token = jwt.sign({_id:savedUser._id,email: savedUser.email,},SECRET_KEY)
                   const {_id,name,email} = savedUser
                   res.json({token,user:{_id,name,email}})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or password"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
  }