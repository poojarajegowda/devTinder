const express=require("express")

const app=express()

app.use("/",(req,res)=>{
    res.send("haiii")
})
app.use("/hello",(req,res)=>{
    res.send("pooja")
})

app.listen(3000,()=>{
    console.log("Server is successfully established")
})