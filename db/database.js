require('dotenv').config();
const mongoose = require('mongoose');


class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env['MONGO_URI'], {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Database connection successfully');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }
}

module.exports = new Database();