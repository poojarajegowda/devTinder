const express=require("express")
const connectDB= require("./config/database")
const app=express()

const User=require("./models/user")

app.post("/signup",async (req,res)=>{

    const user= new User({
        firstName:"Pooja",
    lastName:"Rajegowda",
    emailID:"pooja1710@gmail.com",
    password:"pooja@1234"
    
    })
    try{
        await user.save()
        res.send("Data added successfully")
    }catch(err){
      res.status(400).send("Error saving the data: "+ err.message)
    }
   
})


connectDB()
.then(()=>{
    console.log("Database is connected successfully")


app.listen(3000,()=>{
    console.log("Server is successfully established")
})

}).catch((err)=>{
    console.error("Database is not connected")
})

