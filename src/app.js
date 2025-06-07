const express=require("express")
const {isAuth,userAuth}=require("./middlewares/auth.js")
const app=express()
app.use("/admin",isAuth)
app.get("/user",userAuth,(req,res)=>{
    res.send("User data received")
})
app.get("/admin/getAllData",(req,res,next)=>{
    
    res.send("data appearead successfully")
    next();
})


app.get("/admin/deleteAllData",(req,res)=>{
    res.send("deleted sucessfully")
})
app.listen(3000,()=>{
    console.log("Server is successfully established")
})