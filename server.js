//Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
//bcrypt for encryption
var bcrypt = require('bcrypt');
//hat for token
var hat = require('hat');
//requiring the currently run server

var session = require('express-session');
//get the user model from our db schema
var User = require('./app/models/nerd.js');
//for creating random token
// var hat = require('hat');
//parser for cookies
// var cookieParser = require('cookie-parser');

//connect to local database
//note: when heroku runs this app, it will get the environment variable that was set
//if statement: mongolab uri or this local host
var database = 'mongodb://localhost/bugatti';
mongoose.connect(database, function(err, result){
  if(err) return err;
  console.log('Successfully connected to DB');
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
// app.get('/signup', function(req, res){
//   console.log("got it");
//   res.send("hello");
// })
//shall we require our routes here?
//is the path correct?
// require('./public/js/appRoutes')

//express Express' built in middleware - express.static

//static files served correctly?
app.use(express.static(__dirname + '/public'));




// genSaltSync(rounds)
// rounds - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
var salt = bcrypt.genSaltSync(10);

//when the front-end sends a post request at signup
app.post('/signup', function(req, res){
  var user = {
    username: req.body.username,
    //asynchronous hash function from bcrypt; pass encrypted and salt used
    password: bcrypt.hash(req.body.password, salt, null, function(err, hash){
      //fill out the function here
      //then the user is added to the database(mongodb)?
    }),
    //randomly generates a token by the hat module
    access_token: hat()
  };
  User.create(user, function(err){
    if (err) console.log(err);
    //(in Express.js docs: res.cookie(name, value [, options]))
    //maxAge is a string that is 'Convenient option for setting the expiry time relative to the current time in milliseconds.'
    //httpOnly is a Boolean that '  Flags the cookie to be accessible only by the web server.'
    res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
    res.send('success');
    //RESPONSE CODE???
  });
});
//TO DO FOR TOMORROW - HANDLE LOGIN POST REQUEST
app.post('/login', function(req, res){
  var user_login = {
    username: req.body.username
  }
})





