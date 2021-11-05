const express = require("express");

const app = express();

const { animals } = require("./data/animals.json");

app.get("/api/animals", (req, res) => {
  // // access query property on the req object
  //console.log(req.query);

  let results = animals;
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001`);
});
