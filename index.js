require('dotenv').config();

require('./db/database');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const urlService = require('./services/shortener.js');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  const result = urlService.addUrl(req.body.url);
  res.json({ original_url: req.body.url, short_url: 1 });
});

app.get('/api/shorturl/:url', function (req, res) {
  console.log(req.params.url);
  res.redirect('https://www.google.com');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
