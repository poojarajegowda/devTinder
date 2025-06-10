const mongoose = require("mongoose")
const validator = require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50,
        trim:true
    },
    lastName:{
        type:String,
        minlength:4,
        maxlength:50,
        trim:true
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(val){

       if(!validator.isEmail(val)){
        throw new Error("enter a valid emailId")
       }
        }

    },
    password:{
        type:String,
        trim:true,
        validate(val){

            if(!validator.isStrongPassword(val)){
             throw new Error("enter a strong password!!!!")
            }
             }
    },
    age:{
        type:Number,
        min:18,
        trim:true
    },
    gender:{
        type:String,
        trim:true,
        validate(val){
            if(!["male","female","others"].includes(val)){
                throw new Error("Not a valid gender")
            }
        }
    },
    about:{
        type:String,
        trim:true,
        default:"This is the about of the user"
    },
    skills:{
        type:[String],
        trim:true
       
    },
    photoURL:{
        type:String,
        validate(val){

            if(!validator.isURL(val)){
             throw new Error("enter a valid url!!!!")
            }
             }
    }
},{ timestamps: true })

userSchema.methods.getJWT=async function(){
    const user=this;

    const validToken=await jwt.sign({ _id: user._id }, "strongToken@1710",{expiresIn:"1d"});
    return validToken;
}

userSchema.methods.validatePassword=async function(password){

    const user=this;

    const checkPassword=await bcrypt.compare(password, user.password);
    return checkPassword;
}

module.exports = mongoose.model("User",userSchema)