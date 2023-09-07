require('dotenv').config();

require('./db/database');
const express = require('express');
const bodyparser = require('body-parser');
const shortid = require('shortid');
const dns = require('dns');
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

app.post('/api/shorturl', function (req, res) {
  const url = req.body.url;
  const httpRegex = /^(http|https)(:\/\/)/;
  const divider = url.split('//');
  if (!httpRegex.test(url)) {
    return res.json({ error: 'invalid url' });
  }
  const subdomain = divider[1].split('www.');
  dns.lookup(subdomain[1], async function (err, addresses, family) {
    const id = shortid.generate();
    await urlService.addUrl(url, id);
    res.status(200).json({
      original_url: url,
      short_url: id,
    });
  });
});

app.get('/api/shorturl/:url', function (req, res) {
  const input = req.params.url;
  urlService.getURL(input).then((url) => {
    const short_url = url[0]?.shortUrl;
    const original_url = url[0]?.originalUrl;
    if (short_url === input) {
      res.status(200).redirect(`${original_url}`);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
