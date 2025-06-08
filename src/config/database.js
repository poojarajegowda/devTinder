const mongoose=require("mongoose")

const connectDB=async()=>{

await mongoose.connect
("mongodb+srv://poojarajegowda1710:UHcCAdYDP155yDTH@namastenode.lgg4ez5.mongodb.net/devTinder")
}

module.exports=connectDB
