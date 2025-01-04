const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());

app.post('/signup', async (req,res) => {
    //console.log(req.body);
    const userObj = req.body;

    const user = new User(userObj);
    await user.save();
    res.send("User added successfully!!");
});

app.get('/user', async (req,res) => {
    const email = req.body.emailId;
    try{
        const user = await User.find({ emailId: email });
        res.send(user);
    }catch(err){
        res.status(400).end("Something went wrong");
    }
    
});

app.delete('/user', async (req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send(user+"User deleted successfully");
    }catch(err){
        res.status(400).end("Something went wrong");
    }
});

app.get('/feed', async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
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
