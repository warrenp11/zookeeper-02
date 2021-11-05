const express = require("express");

const app = express();

const { animals } = require("./data/animals.json");

// takes in `req.query` as an argument and filters through the animals accordingly, returning new filtered array
function filterByQuery(query, animalsArray) {
  let filteredResults = animalsArray;
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
};

app.get("/api/animals", (req, res) => {
  // // access query property on the req object
  //console.log(req.query);
  let results = animals;
  // call `filterByQuery` in the callback
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001`);
});
