var express = require('express');
var router = express.Router();
var User = require('../models/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',async function(req,res,next){

  const uemail=await User.findOne({email:req.body.email});
  if(uemail){
    return res.sendStatus(409);
  }


  const UserModal = new User(req.body)
  
  try {
     const UserSave =  await UserModal.save()
     res.status(200).json(UserSave)
  } catch (error) {
      console.log(error);
      next(error);
  }
});

const Loginuser = async (req,res,next) =>{
  console.log("Request received")
  try {
       const user = await User.findOne({email:req.body.email})
      if(!user){
        //  return next(new Error());
         return res.sendStatus(404);

      }
      const isPassword = await bcrypt.compare(req.body.password , user.password);

      if(!isPassword){
      // return next(new Error());
      return res.sendStatus(401);
      }

      const token = jwt.sign({id:user._id}, "Secret")


     res.cookie("access_token", token, {httpOnly: true}).status(201).send("User Authenticated and Logged In!!!")
  } catch (error) {
      console.log(error)
      return next(new Error())
  }
}

router.post('/signin', (req,res,next)=>Loginuser(req,res,next))

module.exports = router;