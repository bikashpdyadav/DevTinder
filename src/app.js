const express = require('express');
const app = express();

app.get("/user",(req,res) => {
    res.send({firstName:"Bikash", lastName:"Yadav"});
})
app.use("/test",(req,res) => {
    res.send("Namaste Bikash");
})
app.post("/user",(req,res) => {
    res.send("Data saved success.")
})
app.delete("/user",(req,res) => {
    res.send("Data deleted success.")
})
app.listen(3000, () => {
    console.log("Server is running...");
})
console.log("!Shree Ganesha!")