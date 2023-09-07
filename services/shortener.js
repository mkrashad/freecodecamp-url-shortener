let URLModel = require('../model/urlSchema');

const addUrl = (url, id) => {
  const msg = new URLModel({
    originalUrl: url,
    shortUrl: id,
  });
  msg
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return msg;
};

const getURL = (value) => {
  const data = URLModel.find({ shortUrl: value }).exec();
  return data;
};

module.exports = { addUrl, getURL };
