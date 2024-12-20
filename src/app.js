const express = require('express');
const app = express();

app.use("/",(req,res) => {
    res.send("Namaste Bikash");
})

app.use("/contact",(req,res) => {
    res.send("Namaste Bikash @Contact");
})

app.listen(7777, () => {
    console.log("Server is running...");
})
console.log("!Shree Ganesha!")