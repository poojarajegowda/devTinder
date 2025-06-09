const express=require("express")

const connectDB= require("./config/database")
const app=express()

const User=require("./models/user")

app.use(express.json());
//get the data from the database based on emailID

app.get("/user",async (req,res)=>{
  const userEmail=req.body.emailID
     try{
        const ID= await User.find({emailID:userEmail})
        res.send(ID)
     }
     catch(err){
        res.status(400).send("User not found")
        }
})
//delete data from database
app.delete("/user",async (req,res)=>{
   const id= req.body._id
    try{
        await User.findByIdAndDelete({_id:id})
        res.send("User deleted successfully")
    }
    catch(err){
        res.status(400).send("User not found")
        }
})

// get all the data from the database
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    }
   catch(err){
    res.status(400).send("User not found")
   }
})

//update data to the database

app.patch("/user/:_id",async(req,res)=>{

    const userId=req.params._id;
    const update=req.body

    try{
       const allowedUpdated=["_id","gender","skills","password","about","age","photoURL"]

       const isAllowed = Object.keys(update).every((k)=>allowedUpdated.includes(k))

       if(!isAllowed){
        throw new Error("Update is not allowed")
       }
       if (update.skills.length>10){
        throw new Error("Skills  must be less than 10")
       }
      

        const user=await User.findByIdAndUpdate({_id:userId},update,{runValidators:true})
    
       res.send("User updated successfully")
    }catch(err){
        res.status(400).send("User cannot be updated : "+ err.message)
    }
   
})

app.patch("/feed",async(req,res)=>{

    const Id=req.body.emailID
    const update=req.body
   try{
    await User.findOneAndUpdate({emailID:Id},update)
    res.send("Updated the data successfully")
}catch(err){
    res.status(400).send("User not found")
}
   
})
//put data into database
app.post("/signup",async (req,res)=>{

    const user= new User(req.body)
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

