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
router.get("/", async (req, res) => {
  try {
    const result = await Product.find();
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
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
