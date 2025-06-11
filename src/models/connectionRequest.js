const mongoose=require("mongoose")

const connectionRequestSchema=new mongoose.Schema({
    fromUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accept","reject"],
            message:`{VALUE}  is a invalid status type`
        }
    }
},{
    timestamps:true
})


connectionRequestSchema.index({fromUserID:1 ,toUserID:1})     //index in schema


module.exports=mongoose.model("ConnectionRequestModel",connectionRequestSchema)