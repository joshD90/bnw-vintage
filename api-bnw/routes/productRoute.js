require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/productModel.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cors = require("cors");

//set up our middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({ origin: "http://localhost:3000" }));

//endpoints
//get all products
router.get("/", async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get single product by id
router.get("/:id", async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//create a Product
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    //find the mongoose document
    const docToChange = await Product.findById(req.params.id);
    //compare the updated object values with our mongoose document.
    //to see whether we need to update our Stripe Product
    let stripeProductObj = {};
    if (req.body.name !== docToChange.name)
      stripeProductObj.name = req.body.name;
    if (req.body.desc !== docToChange.desc)
      stripeProductObj.description = req.body.desc;
    if (req.body.image !== docToChange.image)
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
    if (req.body.basePrice !== docToChange.basePrice) {
      const newStripePrice = await stripe.prices.create({
        product: docToChange.stripe.productId,
        unit_amount: req.body.basePrice * 100,
        currency: "eur",
      });
      docToChange.stripe.priceId = newStripePrice.id;
    }
    //we must use the Object.assign and not spread operator as we don't want a shallow copy,
    //object.assign still gives us access to the original object which is mongoose document rather than just a simple object
    Object.assign(docToChange, req.body);
    //finally save the new object
    const updatedObject = await docToChange.save();
    res.status(200).json(updatedObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
