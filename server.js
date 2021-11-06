const express = require("express");

// When Heroku run sour app it sets an environment variable called `process.env.PORT`
// Tell our app to use that port, if it has been set, and if not, default to port
const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data (from POST route)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { animals } = require("./data/animals.json");

// takes in `req.query` as an argument and filters through the animals accordingly, returning new filtered array
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // save personality traits as a dedicated array
    // IF personality traits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the `.forEach()` loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
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
}

// takes in the id and array of animals and returns a single animal object
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  console.log(body);
  // function's main code will go below!

  // return finished code to POST route for response
  return body;
}

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

// GET route for animals, returns specific animal rather than an array of all the animals that match query
// uses req object property `req.params`. Unlike the query object, the param object needs to be defined in the route path, with `<route>/:<parameterName>`
app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  // if no record exists for the animal being searched for, the client receives a 404 error
  if (result) {
    res.json(result);
  } else {
    // res.send(404); (Deprecated: use `res.sendStatus(status)` instead)
    res.sendStatus(404);
  }
});

// POST route, client-side
app.post("/api/animals", (req, res) => {
  // req.body is where our incoming content will be
  // console.log(req.body);
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
