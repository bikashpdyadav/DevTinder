const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.post('/signup', async (req, res) => {
    //console.log(req.body);
    const userObj = req.body;
    try {
        validateSignupData(userObj);
        const {firstName, lastName, emailId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName, lastName, emailId, password:hashedPassword,
        });
        await user.save();
        res.send("User added successfully!!");
    }
    catch (err) {
        res.status(400).send("Error catched: " + err);
    }
});

app.post('/login', async (req,res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user) res.send("No user exist");

        const isPasswordValid = bcrypt.compare(password, user.password);
        if(isPasswordValid) res.send("Login successful");
        else res.send("Incorrect password");
    }catch(err){
        res.status(400).send("Error");
    }
})
app.patch('/user/:userId', async (req, res) => {
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
})

app.get('/user', async (req, res) => {
    const email = req.body.emailId;
    try {
        const user = await User.find({ emailId: email });
        res.send(user);
    } catch (err) {
        res.status(400).end("Something went wrong");
    }

});

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send(user + "User deleted successfully");
    } catch (err) {
        res.status(400).end("Something went wrong");
    }
});

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).end("Something went wrong");
    }
});

connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is running...");
    })
    console.log("!Shree Ganesha!")
}).catch((err) => {
    console.log("Database couldn't be connected!!");
})
