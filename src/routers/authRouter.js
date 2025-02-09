const express = require('express');
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

authRouter.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        validateSignupData(req.body);
        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName, lastName, emailId, password: hashedPassword,
        });

        const savedUser = await user.save();
        const freshUser = await User.findById(savedUser._id);
        const token = freshUser.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true
        });

        res.json({ message: "User added successfully!!", data: freshUser });
    } catch (err) {
        res.status(400).send("Error while signing up: " + err);
    }
});


authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user) return res.status(404).send("No user exists");

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) return res.status(401).send("Invalid credentials");

        const token = await user.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true
        });
        return res.status(200).json({message: "Login Successful", data: user}); // ✅ Return to prevent further execution
    } catch (err) {
        return res.status(500).send("Error while signing in: " + err);
    }
});

authRouter.post('/logout', async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,      // Ensures it's not accessible by JS
        sameSite: "None",     // Allows cross-origin cookie clearing
        secure: true          // Required if using HTTPS
    });

    return res.status(200).send("Logout Successful!!");
});

module.exports = authRouter;