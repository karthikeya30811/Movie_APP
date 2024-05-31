// watchlistSchema.js

const mongoose = require('mongoose');

// Define watchlist schema
const watchlist = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    Title: String,
    Year: String,
    Poster: String,
    imdbID: String
});

// Create Watchlist model
const Watchlist = mongoose.model('Watchlist', watchlist);

module.exports = Watchlist;
