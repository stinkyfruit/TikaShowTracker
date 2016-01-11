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
//get the user model from our db schema
var User = require('./app/models/nerd.js');

//connect to local database
var database = 'mongodb://localhost/bugatti';
mongoose.connect(database, function(err, result){
  if(err) return err;
  console.log('Successfully connected to DB');
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('LISTENING TO PORT' + port);

//to see the requests in console
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//shall we require our routes here?
// require('./public/js/appRoutes')

app.use(express.static(__dirname + '/public'));

//POST for signup
app.post('/signup', function(req, res){
  var user = {
    //username is set to the request body's username
    username: req.body.username,
    //password is set to the hashed password
    password: bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {throw (err)};
      return hash;
    }),
    //randomly generates a token by the hat module
    access_token: hat()
  };
  //mongoose .create()
  User.create(user, function(err){
    if (err) throw err;
    //maxAge = expiration time in ms & httpOnly is boolean to flag cookie for server
    res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
    res.send('success');
  });
});

//POST for login
app.post('/login', function(req, res){
  var user_login = {
    username: req.body.username
  };

  //mongoose .findOne()
  User.findOne(user_login, function(err, user) {
    if (err) throw err;
    //ascyhronous bcrypt compare 
    bcrypt.compare(req.body.password, user.password, function(err, match){
      //check for err
      console.log(user);
      if (err) throw err;
      //check if the match is true
      if (match === true){
      //give use a token
      user.access_token = hat();
      //mongoose .save() the info to the db collection
      user.save();
      //create cookie session
      res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
      //log user
      console.log(user);
      res.send('Logged in!');
    } else {
      res.send('Cannot log in!');
    }
    });
  });
});




