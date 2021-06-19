const express = require('express');
const harp = require('harp');
const app = express();
const port = 4000;

app.use(express.static(__dirname));
app.use(harp.mount(__dirname));

app.listen(port, () => {
  console.log(`TSP Alumni listening at http://localhost:${port}`);
})
