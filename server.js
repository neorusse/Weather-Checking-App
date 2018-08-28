// Require Express
const express = require('express');
// Require Body Parser
const bodyParser = require('body-parser');
// Require Request
const request = require('request');

const PORT = process.env.PORT || 5000

// require and load dotenv
require('dotenv').load();

//Instantiating our App
const app = express()

// Using our API Key
const apiKey = process.env.MYAPIKEY;

app.use(express.static('public'));

// Use Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Setting our Template Engine View to EJS
app.set('view engine', 'ejs');
// Getting our Root URL
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

// Form Route for Post Request
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
    // utilizing Request Module
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        // Parse the data
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })

// Server Port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))