const asyncHandler=require("express-async-handler");
const generateToken=require("../config/generateToken");
const User=require("../models/userModel")
const signup=async (req,res)=>{
    
   const {name,email,password,pic} = await req.body;
   if(!name || !email || !password) {
    res.status(400)
   throw new Error ("Please enter all the fields")
   }
   const existingUser=await User.findOne({email})
   if(existingUser) {
    res.status(400)
   throw new Error ("User already exists")
   }
   const user= await User.create({name,email,password,pic})
   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
   }else{
    res.status(400).json({message:"Failed to create user"})
   }
}

const login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password) {
    res.status(400)
   throw new Error ("Please enter email and password")
   }
   const user=await User.findOne({email})
 
   if(user && (await user.matchPassword(password))){
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
   }else{
    res.status(401).json({message:"Invalid email or password"})
   }
 
}

const allUsers=async(req,res)=>{
 const keyword=req.query.search?{
    $or:[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}}
    ]
 }:{} // it will search a user by name or email in search query else will send back whole users list
 const users =await User.find(keyword).find({_id:{$ne:req.user._id}})
 res.send(users)
}

module.exports={signup,login,allUsers};