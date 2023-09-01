require('dotenv').config()
const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});