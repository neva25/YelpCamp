const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const User = require("../models/user");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  await User.deleteMany({});
  const user = new User({ email: "neva@hotmail.com", username: "Neva" });
  await User.register(user, "password");

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: user,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem voluptate debitis minus iusto provident quibusdam labore tempore. Temporibus pariatur voluptatibus aliquam, fugit atque voluptas, possimus architecto necessitatibus tempore recusandae quae!",
      price,
      geometry: {
        type: "Point",
        coordinates: [-74.5, 40]
      },
      images: [
        {
          url: "https://res.cloudinary.com/ds06fvo7w/image/upload/v1628014046/YelpCamp/rrah2hlrbakgwywaksah.jpg",
          filename: "YelpCamp/rrah2hlrbakgwywaksah",
        },
        {
          url: "https://res.cloudinary.com/ds06fvo7w/image/upload/v1628014046/YelpCamp/ggqsjq7szd5rrpkb69hz.jpg",
          filename: "YelpCamp/ggqsjq7szd5rrpkb69hz",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
