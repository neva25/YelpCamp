const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: string,
  price: string,
  description: string,
  location: string,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
