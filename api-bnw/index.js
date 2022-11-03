require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
require("./passportLocal.js")(passport, bcrypt);

//import routes
const productRoute = require("./routes/productRoute.js")(passport);
const paymentRoute = require("./routes/paymentRoute.js");
const userRoute = require("./routes/userRoute.js")(passport);
const bookingRoute = require("./routes/bookingRoute.js")(passport);
//set up express / app
const app = express();
//set up cors as frontend resides on a different server.  With credentials allows for cookie information
//to be passed through requests which will be needed for our sessions
app.use(cors({ origin: "http://141.136.42.206", credentials: true }));

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

//set up our passport session middleware.
app.use(
  session({
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
//Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//set up our app to use our routes
app.use("/api/product", productRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);

//listen to the server on specific port
app.listen(process.env.PORT || 5000, () => {
  console.log(`server is listening on port ${process.env.PORT || 5000}`);
});
