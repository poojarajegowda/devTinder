const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

//sendConnectionRequest api

requestRouter.post(
  "/request/send/:status/:userID",
  userAuth,
  async (req, res) => {
    try {
      const fromUserID = req.user._id;
      const toUserID = req.params.userID;
      const status = req.params.status;

      const allowedStatusType = ["interested", "ignored"];
      if (!allowedStatusType.includes(status)) {
        throw new Error("Invalid status type");
      }

      //cannot send connection to themselves
      if (fromUserID.toString() === toUserID.toString()) {
        throw new Error("Cannot send request to themselves");
      }

      //if unknown toUserID is given

      const toUser = await User.findById(toUserID);
      if (!toUser) {
        return res.status(400).json({
          message: "toUserID does not exists in the database",
        });
      }

      //checks if connection already presents
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserID, toUserID },
          { fromUserID: toUserID, toUserID: fromUserID },
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("connection request already exists");
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserID,
        toUserID,
        status,
      });

      await connectionRequest.save();

      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
