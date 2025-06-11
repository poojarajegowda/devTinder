const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");

//get the profileapi
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Cannot edit the profile");
    }

    const user = req.user;
    console.log(user);
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    console.log(user);

    await user.save();

    res.json({ message: `${user.firstName} Edited the profile`, data: user });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
  try {
    const user = req.user; //current password
    const { password } = req.body;
    if (!password) {
      throw new Error("Password is required");
    }
    const newPasswordHash = await bcrypt.hash(password, 10);

    user.password = newPasswordHash;

    await user.save();
    res.send("password updated");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
module.exports = profileRouter;
