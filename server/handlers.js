const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Get a list of all users in the database
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("moviegoer");
    const data = await db.collection("users").find().toArray();
    console.log(data);
    res.status(200).json({ status: 200, data: data, message: "Here's the users." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: "Something went wrong." });
  }
};

// Get a user's watchlist
const getWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;
  try {
    await client.connect();
    const db = client.db("moviegoer");
    const data = await db.collection("users").findOne({ _id: userEmail });
    console.log(data);
    res.status(200).json({ status: 200, data: data.watchlist, message: "Here's the user's watchlist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: "Something went wrong." });
  }
};

// Get a list of user's reviews
const getReviews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;
  try {
    await client.connect();
    const db = client.db("moviegoer");
    const data = await db.collection("users").findOne({ _id: userEmail });
    console.log(data);
    res.status(200).json({ status: 200, data: data.reviews, message: "Here's the user's reviews." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: "Something went wrong." });
  }
};

// Checking if user exists, if not add it to the collection
const checkUser = async (db, userEmail) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const user = await db.collection("users").findOne({ _id: userEmail });
    if (!user) {
      const newUser = {
        _id: userEmail,
        name: "",
        favorites: [],
        watchlist: [],
        reviews: [],
      };
      await db.collection("users").insertOne(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

//Add a movie to a user's watchlist
const addToWatchlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("moviegoer");
  const movieInfo = req.body.movie;
  const { userEmail } = req.params;

  try {
    await client.connect();
    await checkUser(db, userEmail);
    await db.collection("users").updateOne({ _id: userEmail }, { $push: { watchlist: movieInfo } });
    res.status(200).json({ status: 200, data: movieInfo, message: "Movie added to watchlist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: "MNovie not added to watchlist." });
  } finally {
    client.close();
  }
};

module.exports = { getWatchlist, getUsers, getReviews, addToWatchlist };
