const mongoose = require('mongoose');

const urlShortener = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

module.exports = mongoose.model('Shortener', urlShortener);
