const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user")
app.post('/signup', async (req,res) => {
    const userObj = {
        firstName: "Akshay",
        lastName: "Saini",
        emaiId: "akshay@saini123.com",
        age: 28,
        password:"akshay@123"
    }

    const user = new User(userObj);
    await user.save();
    res.send("User added successfully!!");
})

connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is running...");
    })
    console.log("!Shree Ganesha!")
}).catch((err) => {
    console.log("Database couldn't be connected!!");
})
