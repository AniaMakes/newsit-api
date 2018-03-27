const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.API_KEY);

const app = express();

app.use(bodyParser.json());

// make get requests here. Account for 404 and 500 errors.

app.get('/topheadlines', (req, res, next) => {
  //TODO take language checking into a separate function;
  const acceptLang = req.headers['accept-language'];
  const lang = acceptLang.split(',')[0].split('-')[1];

  const acceptedLangs = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

  let queryLang;

  if (acceptedLangs.includes(lang.toLowerCase())) {
    queryLang = lang;
  } else {
    queryLang = 'gb';
  }
  newsapi.v2.topHeadlines({
    category: 'general',
    country: queryLang,
    pageSize: 5,
  }).then((response) => {
    // console.log(response);
    res.status(200).json(response);
  }).catch((err) => {
    next(err);
  });
});

app.use((req, res) => {
  res.status(404).send(':( NOPES. Nothing to see here');
});

app.use((err, req, res) => {
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
