const express = require('express');
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

authRouter.post('/signup', async (req, res) => {
    //console.log(req.body);
    const userObj = req.body;
    try {
        console.log(userObj)
        validateSignupData(userObj);
        const { firstName, lastName, emailId, password } = userObj;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName, lastName, emailId, password: hashedPassword,
        });
        await user.save();
        res.send("User added successfully!!");
    }
    catch (err) {
        res.status(400).send("Error while signing up: " + err);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user) return res.status(404).send("No user exists");

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) return res.status(401).send("Incorrect password");

        const token = await user.getJWT();
        res.cookie("token", token);
        return res.status(200).json(user); // ✅ Return to prevent further execution
    } catch (err) {
        return res.status(500).send("Error while signing in: " + err);
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send();
});

module.exports = authRouter;