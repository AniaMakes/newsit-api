const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// make get requests here. Account for 404 and 500 errors.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
