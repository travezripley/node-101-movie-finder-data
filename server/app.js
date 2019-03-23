//March 17th, 2019 * Node101-Movie-Finder-Data * San Diego Code School
//Required NPM Packages
// Create Express server framework
const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
app.use(morgan('dev'));

var cache = {}; //the cache 
//storing request parameters

app.get('/', (req, res) => {
  //res.send("Sup Dawg, We need to fix this app!");

  const movieId = req.query.i;
  const movieTitle = encodeURIComponent(req.query.t); //encodeURIComponent(req.query.t);

  if (movieId) {//checks to see if it is a movie*id or movie*title
    if (cache.hasOwnProperty(movieId)) {
      res.json(cache[movieId]);
      console.log('MovieId was sent from the cache.');
    } else {
      //console.log('MovieId was not found in the cache, use Axios.');  
      axios
        .get(`http://www.omdbapi.com/?i=${movieId}&apikey=8730e0e`)
        .then(response => {
          cache[movieId] = response.data;
          res.json(cache[movieId]);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  } else if (movieTitle) {
    if (cache.hasOwnProperty(movieTitle)) {
      res.json(cache[movieTitle]);
      //console.log(`MovieTitle - ${movieTitle} - was sent from the cache.`);
    } else {
      axios
        .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=8730e0e`)
        .then(response => {
          cache[movieTitle] = response.data;
          res.json(cache[movieTitle]);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }

});
//export the express application
module.exports = app;            