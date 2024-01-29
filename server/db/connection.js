const mongoose = require("mongoose");
const DB = "mongodb+srv://piyush192:nimcet@cluster0.huh1vr9.mongodb.net/";


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() =>
{
    console.log("Connection success.");
})
.catch((error) =>
{
    console.log(error)
})