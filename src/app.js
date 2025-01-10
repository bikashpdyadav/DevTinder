const express = require('express');
const app = express();
const connectDB = require("./config/database");

app.use(express.json());

const authRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');
const requestRouter = require('./routers/requestRouter');
const userRouter = require('./routers/userRouter');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is running...");
    })
    console.log("!Shree Ganesha!")
}).catch((err) => {
    console.log("Database couldn't be connected!!");
})
