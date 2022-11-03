const mongoose = require("mongoose");

//create the blueprint for what our document will look like
const BookingSchema = mongoose.Schema({
  fName: { type: String, required: true },
  sName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  address3: { type: String, required: true },
  address4: { type: String, required: true },
  contactNum: { type: String, required: true },
  purchase: { type: Array, required: true },
  sent: { type: Boolean, required: true, default: false },
});

//export our booking model which shall be used for creating orders.
module.exports = mongoose.model("Booking", BookingSchema);
