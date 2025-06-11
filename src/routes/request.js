const express=require("express")

const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth");

//sendConnectionRequest api

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + "sent a connectionn request");
  });


module.exports=requestRouter