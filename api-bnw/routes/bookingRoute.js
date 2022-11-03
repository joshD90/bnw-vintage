//this route handles the creation and making available of orders.
//to access the passport object modularly we export the whole router as a function
//and pass passport into this
module.exports = function (passport) {
  //require all our modules
  const Booking = require("../models/bookingModel.js");
  const express = require("express");
  const cors = require("cors");
  //set up our router object
  const router = express.Router();
  //set up middle ware
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  //we will need cors as the frontend is on another server
  router.use(cors({ origin: "http://141.136.42.206", credentials: true }));

  //this is a middleware function, if the user is authenticated then we skip on to (req,res) callback function
  //of an endpoint or we return an error
  const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated())
      return res
        .status(401)
        .json("You are not authorised to access this route");
    return next();
  };
  //this route returns all the Orders that have been stored in our DB
  router.get("/", isLoggedIn, async (req, res) => {
    try {
      //we only get the priceId and the quantity so we need to perform a look up action to associate
      //priceIds with their relevant products
      let result = await Booking.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "priceId",
            foreignField: "stripe.priceId._id",
            as: "products",
          },
        },
      ]);
      //once we have the list of products being ordered, we need to add the quantity of these items ordered
      //to the object
      result.forEach((booking) => {
        booking.purchase.forEach((item, index) => {
          booking.products[index].quantity = item.quantity;
        });
      });
      //this is a filter the user can toggle to see all unsent or sent orders
      if (req.query.status === "sent") {
        result = result.filter((doc) => doc.sent === true);
      }
      if (req.query.status === "pending") {
        result = result.filter((doc) => doc.sent === false);
      }
      //send back our aggregated results
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //this route handles deletions.  Stripe payment is a redirected link so we need to create the order
  //prior to redirecting, if there is a cancellation we need to delete this order. Also if the admin wishes
  //to delete an order he can also
  router.delete("/:id", async (req, res) => {
    try {
      //we first check to see whether the booking exists
      const exists = await Booking.exists({ _id: req.params.id });
      if (!exists)
        return res.status(200).json("This Booking has Already Been Deleted");
      //delete booking
      await Booking.findByIdAndDelete(req.params.id);
      console.log("booking deleted");
      res.status(200).json("You have successfully Removed the Booking");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //admin can update orders in a limited way to say whether they have been sent or not
  router.put("/", isLoggedIn, async (req, res) => {
    try {
      //find the booking
      const result = await Booking.findById(req.body.id);
      //change the sent field depending on what is in the req body
      if (req.body.status.toLowerCase() === "sent") result.sent = true;
      if (req.body.status.toLowerCase() === "pending") result.sent = false;
      //once we have updated the object we can now save this
      const savedObject = await result.save();
      //return the newly updated object
      res.status(200).json(savedObject);
    } catch (error) {
      console.log(error);
      res.status(500).json("There was an error with updating the order");
    }
  });

  return router;
};
