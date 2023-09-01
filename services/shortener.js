let URLModel = require('../model/urlSchema');

const addUrl = (value) => {
  const msg = new URLModel({
    originalUrl: value,
    shortUrl: 1,
  });
  msg
    .save()
    .then((res) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return msg
};

module.exports = { addUrl };
