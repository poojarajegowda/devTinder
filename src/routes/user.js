const express=require("express")
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequestModel=require("../models/connectionRequest")

//get request received api
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{

try{

const loggedInUser=req.user

const connectionRequest=await ConnectionRequestModel.find({
    toUserID:loggedInUser._id,
    status:"interested"
}).populate("fromUserID","firstName lastName photoURL skills age gender")


if(!connectionRequest){
    throw new Error("There is no requests for you")
}
 
res.json({data:connectionRequest})

}
catch(err){
    res.status(400).send(err.message)
}


})

//get connections
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user

        const connectionAccepted=await ConnectionRequestModel.find({
            $or:[
               { fromUserID:loggedInUser._id,status:"accept"},
                {toUserID:loggedInUser._id,status:"accept"}
            
            ]
        }).populate("fromUserID","firstName lastName photoURL skills age gender")
        .populate("toUserID","firstName lastName photoURL skills age gender")

        const data=connectionAccepted.map((row)=>{
            if(row.fromUserID.toString()===loggedInUser._id.toString()){
                return row.toUserID
            }
            return row.fromUserID
        })

        res.json({data})
    }
    catch(err){
        res.status(400).send(err.message)
    }


})
module.exports=userRouter