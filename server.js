//Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');


var session = require('express-session');
//get the user model from our db schema
var User = require('./app/models/nerd.js');
//for creating random token
var hat = require('hat');
//parser for cookies
var cookieParser = require('cookie-parser');

//connect to local database
//note: when heroku runs this app, it will get the environment variable that was set
//if statement: mongolab uri or this local host
mongoose.connect('mongodb://localhost/bugatti', function(err, result){
  if(err) return err;
  console.log('Successfully connected to DB')
});

//create a port 
var port = process.env.PORT || 3000;
//start server
app.listen(port);
console.log('LISTENING TO PORT' + port);

//to see the requests in console
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//shall we require our routes here?
//is the path correct?
require('./public/js/appRoutes')

//express Express' built in middleware - express.static
//
express.static(__dirname + '/public');




