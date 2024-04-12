const Place = require("../Models/placeModel");
exports.newPost = async (req, res) => {
  const {
    address,
    checkIn,
    checkOut,
    description,
    maxGuests,
    perks,
    photos,
    title,
  } = req.body;
  const newPost = await Place.create({
    owner: req.user.id,
    address,
    checkIn,
    checkOut,
    description,
    maxGuests,
    photos,
    title,
  });
  res.status(201).send("new post Created");
};

exports.getPost = async (req, res) => {
  res.json(req.user.id);
  const allPosts = await Place.find({ owner: id });
};
