const express=require("express")

const app=express()
app.get("/user",(req,res)=>{
    res.send({firstName:"Pooja",lastName:"Rajegowda"})
})

app.post("/user",(req,res)=>{
    res.send("Pushed the data successfully")
})
app.delete("/user",(req,res)=>{
    res.send("Deleted the info")
})


app.listen(3000,()=>{
    console.log("Server is successfully established")
})