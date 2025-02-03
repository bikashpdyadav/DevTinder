const express = require('express');
const userRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require('../middlewares/auth');

userRouter.get('/user/requests/received', userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId","firstName lastName");

        res.json({message: "Data fetched successfully!! ",connectionRequests});
    }
    catch(err){
        req.statusCode(400).send("ERROR: "+err.message);
    }
});

userRouter.get('/user/requests/', userAuth, async (req,res) => {
    try{

    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

userRouter.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = [
            "userId", "photoUrl", "about", "gender", "age", "skills"
        ]

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update Failed");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        })
    } catch (err) {
        res.status(400).send("Update failed: " + err.message);
    }
});

userRouter.get('/user', async (req, res) => {
    const email = req.body.emailId;
    try {
        const user = await User.find({ emailId: email });
        res.send(user);
    } catch (err) {
        res.status(400).end("Something went wrong");
    }

});

userRouter.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send(user + "User deleted successfully");
    } catch (err) {
        res.status(400).end("Something went wrong");
    }
});

userRouter.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).end("Something went wrong");
    }
});

module.exports = userRouter;