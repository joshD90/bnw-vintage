const mongoose = require("mongoose");

//create the blueprint for our products
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    basePrice: { type: Number, required: true },
    image: { type: String },
    secondaryImages: { type: Array },
    inStock: { type: Boolean, required: true, default: true },
    attributes: { type: Array, required: true },
    color: { type: Array, required: true },
    sizes: { type: Array, require: true },
    stripe: { productId: { type: String }, priceId: { type: String } },
    salePercentOff: { type: Number },
    saleDiscount: { type: Number },
  },
  { timeStamps: true }
);

//export our mongoose model
module.exports = mongoose.model("Product", ProductSchema);
