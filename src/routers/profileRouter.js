const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

profileRouter.get('/profile/view', userAuth, async (req,res) => {
    try{
        const user = req.user;
        res.json({message: "Profile fetched successfull",data: user});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Wrong Input!!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json({message: "Data updated successfully", data: loggedInUser});
    }
    catch(err){
        res.status(400).send("Error while editing: "+err);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req,res) => {
    try{
        
    }
    catch(err){
        res.status(400).send("Couldn't update password: "+err);
    }
});

module.exports = profileRouter;