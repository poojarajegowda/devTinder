const express=require("express")

const authRouter=express.Router()
const User = require("../models/user");
const { validateUser } = require("../utils/validation");
const bcrypt = require("bcrypt");


//signup api
authRouter.post("/signup", async (req, res) => {
  //validation
  const { firstName, lastName, emailID, password } = req.body;
  try {
    validateUser(req);

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //sign the user using post
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("Data added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



//login api
authRouter.post("/login", async (req, res) => {
    try {
      const { emailID, password } = req.body;
      //if email id exists in DB
      const user = await User.findOne({ emailID: emailID });
  
      if (!user) {
        throw new Error("EmailID does not exist in the DB");
      }
  
      //if password is correct
      const validPassword = await user.validatePassword(password)
      if (!validPassword) {
        throw new Error("Password is incorrect");
      } else {
        //create JWT token
        const token = await user.getJWT();
  
        // and wrap it inside a cookie send it back to the browser
        const cookies = res.cookie("token", token,{expires:new Date(Date.now() + 24 * 3600000)});
        //  console.log(cookies)
  
        res.send("login successful");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


  authRouter.post("/logout",async(req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("Logout successfully")
  })
module.exports=authRouter