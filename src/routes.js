const express = require("express")
const { user } = require("./model/user.model")
const bcrybt = require('bcrypt')
const signin = require("./middleware/signin")
const bearerCheck = require("./middleware/bearerCheck")
const checkCap = require("./middleware/checkCap")


const  authRouter  = express.Router()



authRouter.get('/' , (req,res) =>{ 
     res.status(200).json({
          message : 'Home page'
     })
})


authRouter.get('/signup', (req, res) => {
     res.status(200).json({ message: 'sign up page'})
})
authRouter.post('/signup' ,async (req , res , next) =>{
     try{

          const {username , password , role} = req.body
          const passHach = await bcrybt.hash(password , 5)
          const createUser = await user.create({
               username:username,
               password :passHach,
               role : role  
          })
          res.status(201).json({
               user : createUser
          })
     }
     catch(err){
          // console.log(err)
          next('server error 500')
     }
})

authRouter.post('/signin', signin , (req,res) =>{
     res.status(200).json({
          message : req.ehab
     })
} )


authRouter.get('/order', bearerCheck , (req,res) =>{
     if(req.user){
          res.status(200).json({
               wc : 'welcome , you have the access ',
          })
     }
     else{
          res.status(200).json({
               message : 'no access'
          })
     }
} )
authRouter.post('/order', bearerCheck , checkCap('create'), (req,res) =>{
     if(req.user){

          res.status(200).json({
               wc : 'welcome , you have the access to create a contant '
          })
     }
     else{
          res.status(200).json({
               message : 'no access'
          })
     }
} )

authRouter.put('/order', bearerCheck , checkCap('update'), (req,res) =>{
     if(req.user){
          res.status(200).json({
               wc : 'welcome , you have the access to update a contant '
          })
     }
     else{
          res.status(200).json({
               message : 'no access'
          })
     }
} )

authRouter.delete('/order', bearerCheck , checkCap('delete'), (req,res) =>{
     if(req.user){
          res.status(200).json({
               wc : 'welcome , you have the access to delete a contant'
          })
     }
     else{
          res.status(200).json({
               message : 'no access'
          })
     }
} )


module.exports = authRouter