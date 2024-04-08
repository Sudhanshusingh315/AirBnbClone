require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./Routes/userRouter');
const cors = require("cors");
const app = express();
app.use(express.json());

main().catch((err) => console.log(err));
async function main() {
    // await mongoose.connect("mongodb+srv://LeaderOfMeow:qwezxc!!%40!@cluster1.fvlhmya.mongodb.net/Airbnb");
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("mongoose connected")
}
app.use(cors());
// user Router
app.use('/api/user',userRouter.router);
app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
});