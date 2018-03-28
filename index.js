const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.API_KEY);
const { processLangFromBrowser } = require('./helpers/processLangFromBrowser');

const app = express();

app.use(bodyParser.json());

// make get requests here. Account for 404 and 500 errors.

app.get('/topheadlines', (req, res, next) => {
  const acceptLang = req.headers['accept-language'];

  console.log(acceptLang);
  const queryLang = processLangFromBrowser(acceptLang);

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
