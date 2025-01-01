const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://root:root123@cluster0.ibzf3.mongodb.net/DevTinder"
    )
}

module.exports = connectDB;