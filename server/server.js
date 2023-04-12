"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

const { getWatchlist, getUsers, getReviews, addToWatchlist, addToFavorites, removeFromWatchlist, getFavorites, removeFromFavorites } = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  .get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "Your server is running.",
    });
  })

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get("/users", getUsers) // get of all MongoDB users data

  .get("/watchlist/:userEmail", getWatchlist) // get a user's watchlist

  .get("/reviews/:userEmail", getReviews) // get a user's reviews

  .get("/favorites/:userEmail", getFavorites) // get a user's favorites

  .post("/watchlist/:userEmail", addToWatchlist) // add a movie to a user's watchlist

  .post("/favorites/:userEmail", addToFavorites) // add a movie to a user's favorites

  .patch("/remove-from-watchlist", removeFromWatchlist) // remove a movie from a user's watchlist

  .patch("/remove-from-favorites", removeFromFavorites) // remove a movie from a user's favorites



  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(port, () => console.log(`Listening on port ${port}`));
