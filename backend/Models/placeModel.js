const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price:Number,
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
