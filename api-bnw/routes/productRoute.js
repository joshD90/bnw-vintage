module.exports = function (passport) {
  require("dotenv").config();
  const express = require("express");
  const router = express.Router();
  const Product = require("../models/productModel.js");
  const stripe = require("stripe")(process.env.STRIPE_SECRET);
  const cors = require("cors");

  //set up our middleware
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  //cross origin due to front end being set up on a separate server.  Credentials true allows for
  //cookies to be sent over with requests
  router.use(cors({ origin: "http://141.136.42.206", credentials: true }));

  //this is a middleware function, if the user is authenticated then we skip on to (req,res) callback function
  //of an endpoint or we return an error
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    console.log("not authenticated");
    res.send("Your are not authenticated to access this endpoint");
  }

  //get all products - accessible only to admin
  router.get("/", isLoggedIn, async (req, res) => {
    try {
      //do an empty query to find all the products
      const result = await Product.find();
      //return the results
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //get recent products - Public: this is hit by the homepage products
  router.get("/home", async (req, res) => {
    try {
      //sort the all products in order of most recent id's
      //limit to 5 results to send back over
      const result = await Product.aggregate([
        { $sort: { _id: -1 } },
        { $limit: 5 },
      ]);
      //send back the results
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //get single product by id - hit by the single product page
  router.get("/:id", async (req, res) => {
    try {
      //query mongodb through the id parameter
      const result = await Product.findById(req.params.id);
      //return result
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //create a Product
  router.post("/", isLoggedIn, async (req, res) => {
    try {
      //first create the stripe product
      const stripeProduct = await stripe.products.create({
        name: req.body.name,
        description: req.body.desc,
        images: [req.body.image],
      });
      //using the stripe product id we create an associated price id
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: parseInt(req.body.basePrice) * 100,
        currency: "eur",
      });
      //we create the new product, spread the req.body and then include the stripe
      //details in this
      const newProduct = new Product({
        ...req.body,
        stripe: { productId: stripeProduct.id, priceId: stripePrice.id },
      });
      //save the product to the database
      const savedProduct = await newProduct.save();
      //return the saved object back to the user
      res.status(201).json(savedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //update a product
  router.put("/:id", isLoggedIn, async (req, res) => {
    console.log("we have accessed the product point");
    try {
      //find the mongoose document
      const docToChange = await Product.findById(req.params.id);
      let updateObject = req.body;
      console.log(docToChange, "this is the document we want to change");
      //compare the updated object values with our mongoose document.
      //to see whether we need to update our Stripe Product
      let stripeProductObj = {};
      if (req.body.name !== docToChange.name && req.body.name != null)
        stripeProductObj.name = req.body.name;
      if (req.body.desc !== docToChange.desc && req.body.desc != null)
        stripeProductObj.description = req.body.desc;
      if (req.body.image !== docToChange.image && req.body.image != null)
        stripeProductObj.images = [req.body.image];
      //if there is something to do with Stripe product, passed over, we will
      //update the stripe product
      if (stripeProductObj !== {}) {
        await stripe.products.update(
          docToChange.stripe.productId,
          stripeProductObj
        );
      }
      //if the price is changed we must assign a new price to the product
      if (
        req.body.basePrice !== docToChange.basePrice &&
        req.body.basePrice != undefined
      ) {
        //create a new price that will be linked to our product Id
        const newStripePrice = await stripe.prices.create({
          product: docToChange.stripe.productId,
          unit_amount: req.body.basePrice * 100,
          currency: "eur",
        });
        //we need to add the stripe product Id otherwise when we try and append the priceId, the stripe
        //key will return as null
        updateObject.stripe = { productId: docToChange.stripe.productId };
        updateObject.stripe.priceId = newStripePrice.id;
      }
      //update result will not return the document but will instead return a success notification of fields updated
      const updateResult = await Product.updateOne(
        { _id: req.params.id },
        { $set: updateObject }
      );
      res
        .status(200)
        .json({ object: updateObject, updatedResult: updateResult });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  //delete a product
  router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
      //find the Product by Id and Delete
      await Product.findByIdAndDelete(req.params.id);
      console.log("succesfully deleted");
      res.status(204).json("successfully deleted");
    } catch (error) {
      res.status(500).json("Could Not Delete at this Time");
    }
  });
  return router;
};
