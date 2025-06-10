   const User=require("../models/user")
const jwt=require("jsonwebtoken")

const userAuth=async(req,res,next)=>{
      //validate the cookie
      try{
        const cookie=req.cookies

        //token validation\
        const {token}=cookie
        if(!token){
            throw new Error("Token is invalid")
        }
        const decodedData=await jwt.verify(token,"strongToken@1710")
  
       const {_id}=decodedData
      //get the user info

      const user=await User.findById({_id})
       req.user=user

next();

      }catch(err){
        res.status(400).send("ERROR : "+ err.message)
      }

      
}

module.exports={
   userAuth
}