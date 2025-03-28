const jwt=require("jsonwebtoken");
const generateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRETE,{
    expiresIn: '30m'

})
}

module.exports=generateToken;
