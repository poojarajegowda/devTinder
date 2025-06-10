const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateUser } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) => {
  //validation
  const { firstName, lastName, emailID, password } = req.body;
  try {
    validateUser(req);

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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
app.post("/login", async (req, res) => {
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

//get the profileapi
app.get("/profile", userAuth, async (req, res) => {
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

//sendConnectionRequest api

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + "sent a connectionn request");
});

connectDB()
  .then(() => {
    console.log("Database is connected successfully");

    app.listen(3000, () => {
      console.log("Server is successfully established");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
