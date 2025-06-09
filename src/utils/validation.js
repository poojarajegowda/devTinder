const validator=require("validator")

const validateUser=(req)=>{
 
const {firstName,lastName,emailID,password}=req.body
    
if(!firstName || !lastName){
    throw new Error("Enter the name!!")
}
else if(!validator.isEmail(emailID)){
    throw new Error("Enter the valid emailID !!")
}
else if(!validator.isStrongPassword(password)){
    throw new Error("Enter the stromg password !!")
}

}


module.exports={
    validateUser
}