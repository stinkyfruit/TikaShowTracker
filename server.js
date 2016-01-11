//Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
//bcrypt for encryption
var bcrypt = require('bcrypt');
//hat for token
var hat = require('hat');
//session module
var session = require('express-session');
//get the user model from our db schema
var User = require('./app/models/nerd.js');

var request = require('request');

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

app.use(session({resave: true, saveUninitialized: true, secret: "ILOVEUNICORNS", cookie: {maxAge: 60000}}));

//POST for signup
app.post('/signup', function(req, res){
  //user object
  var user = {
      username: req.body.username,
      password: req.body.password,
    };

  //hash password asynchronously 
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
      throw err;
    }
    //set password to hash
    user.password = hash;
    //create a session for user
    user.session = req.session;
    //create user in database with mongoose .create()
    User.create(user, function(err){
      if (err) { 
        console.log(err);
        throw err;
      }
      //log user
      console.log(user);
      /*what you will see from the terminal when user is consoled:
      { username: 'afasf@dfaf.com',
       password: '$2a$10$4ugpuyCxQMt5QPKdDkL9L.KdK00xSLUbQ1b/12e1b7JKwxD9VanQ2',
       session: 
         Session {
           cookie: 
            { path: '/',
             _expires: Mon Jan 11 2016 00:45:26 GMT-0800 (PST),
             originalMaxAge: 60000,
             httpOnly: true } } }*/
      res.send('success');
    });
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
      if (err) throw err;
      //check if the match is true
      if (match){
      //give use a token
      user.access_token = hat();
      //mongoose .save() the info to the db collection
      user.save();
      //create cookie session
      res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});

      //log user
      console.log(user);
      //WE NEED TO REROUTE TO THE INDEX

      res.send('LOGGED IN!');
    } else {
      //STAY ON LOGIN PAGE BUT GIVE AN ERROR THAT USERNAME/PASSWORD NOT VALID

      res.send('CANNOT LOG IN!');
    }
    });
  });
});


//for when front end posts to api/shows - this is when the user selects a show to follow
app.post('/api/shows', function(req, res){
  // User.findOne(req.body.user, function(err, user){
  //   if(err) throw err;
    request('http://www.omdbapi.com/?i='+req.body.imdbID, function(error, res, body){
      if (error) throw error;
      console.log(body);
    });
    res.send('Show saved to the database');
  // });
});




