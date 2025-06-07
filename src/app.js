const express=require("express")

const app=express()

app.use("/user",(req,res,next)=>{
    console.log("1st one")
    // res.send("first handler")
next()

},
(req,res,next)=>{
    console.log("2nd one")
    // res.send("second handler")
    next()
},
(req,res)=>{
    res.send("third handler")
}
)

app.listen(3000,()=>{
    console.log("Server is successfully established")
})