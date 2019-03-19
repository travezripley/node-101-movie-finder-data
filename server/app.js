//March 17th, 2019 * Node101-Movie-Finder-Data * San Diego Code School

//Required NPM Packages

// Create Express server framework
const express = require('express');
const app = express();

const axios = require('axios');
const morgan = require('morgan');

app.use(morgan('dev'));


//const URL = 'http://www.omdbapi.com';

//const path = require('path');

//const cache = {};
//API Key from OMDb
//const API_KEY = "49a19b32";

app.get('/', (req, res) => {
    
    //encodeURIComponent(
    let movieTitle = req.query.t;//look up encode
    let movieId = req.query.i;
    
    //console.log(`movieTitle is ${movieTitle}`);
    
    if (movieTitle) {
        axios
            .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=8730e0e`)
            .then(response => {
                res.status(200).json(response.data);
                //cache = {'movieID': movieId, 'data': response.data};
                //handle response variable
                //console.log(response.data);
                //console.log(response.body);
            })
            .catch(error => {
                console.log('error', error);
        });

    } else if (movieId) {        
        axios
            .get(`http://www.omdbapi.com/?i=${movieId}&apikey=8730e0e`)
            .then(response => {
                res.status(200).json(response.data);
                //cache = {'movieID': movieId, 'data': response.data};
                //handle response variable
                //console.log(response.data);
                //console.log(response.body);
            })
            .catch(error => {
                console.log('error', error);
        });
        // 
    }
    // When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
    //console.log(movieTitle);

    // console.log(req.query);
    // res.send('Hi guys!');
});

module.exports = app;
