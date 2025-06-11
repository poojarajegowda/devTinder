const express=require("express")

const profileRouter=express.Router();
const { userAuth } = require("../middlewares/auth");


//get the profileapi
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user;
  
      if (!user) {
        throw new Error("User is not found");
      }
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

module.exports=profileRouter;