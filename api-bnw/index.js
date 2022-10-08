require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute.js");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

//set up our DB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://blackandwhitevintage:${process.env.ATLAS_PASSWORD}@cluster0.evobrkp.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("you have successfully connected with the Atlas DB");
  } catch (error) {
    console.log(error);
  }
};
//call our connection function
connectToDB();
//set up our app to use our routes
app.use("/api/product", productRoute);

//listen to the server on specific port
app.listen(process.env.PORT || 5000, () => {
  console.log(`server is listening on port ${process.env.PORT || 5000}`);
});
