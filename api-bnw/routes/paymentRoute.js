const router = require("express").Router();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Product = require("../models/productModel.js");
const Booking = require("../models/bookingModel");

//this endpoint handles payments.  As users do not need ot be logged in for this we dont need to export
//this and pass passport as a param

//require necessary middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//takes payment information
router.post("/", async (req, res) => {
  console.log("stripe post endpoint hit");
  try {
    //the promise.all holds all the various different promises which are returned
    //from the mongoose find function which is fired asyncronously
    const listOfPriceIds = await Promise.all(
      //for each item we wish to be purchased we have a product Id - stripe needs a priceID
      //and product id so we map these from the results of the mongo id search
      req.body.items.map(async (item) => {
        const result = await Product.findById(item.id);
        return {
          productId: result.stripe.productId,
          priceId: result.stripe.priceId,
          quantity: item.quantity,
        };
      })
    );
    //once we have our list of price ids we can now create our Orders / booking object
    const bookingObject = {
      ...req.body.shippingDetails,
      purchase: listOfPriceIds,
    };
    //we create a new booking / orders document
    const newBooking = new Booking(bookingObject);
    //save this model to our mongodb
    const savedBooking = await newBooking.save();
    //now we create a new session with stripe. Which takes payment.  This will forumlate a redirect
    //link to the stripe website. Stripe works off priceIds rather than product Id's
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}payment/cancel/${savedBooking._id}`,
      line_items: listOfPriceIds.map((item) => {
        return {
          price: item.priceId,
          quantity: item.quantity,
        };
      }),
    });
    //send this link back to client which will then redirect offsite to stripe
    res.status(200).json(session.url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
