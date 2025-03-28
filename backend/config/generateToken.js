const jwt=require("jsonwebtoken");
const generateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRETE,{
    expiresIn: '5m'

})
}

module.exports=generateToken;
