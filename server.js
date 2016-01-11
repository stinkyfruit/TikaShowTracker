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
//-------------------------------------------
//get the user model from our db schema
var User = require('./app/models/nerd.js');

//connect to local database
// note: when heroku runs this app, it will get the environment variable that was set
//if statement: mongolab uri or this local host
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
//is the path correct?
// require('./public/js/appRoutes')

app.use(express.static(__dirname + '/public'));

//when the front-end sends a post request at signup
app.post('/signup', function(req, res){
  console.log(req.body);
  var user = {
    username: req.body.username,
    password:
    //asynchronous hash function from bcrypt; pass encrypted and salt used
    // bcrypt.genSaltSync(10, function(err, salt){
    //   if(err) throw err;
    //   bcrypt.hash(req.body.password, null, null, function(err, hash){
    //     if(err) throw err;
    //     return hash;
    //   });
    // }),

    bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {throw (err)};
      return hash;
    }),
    //randomly generates a token by the hat module
    access_token: hat()
  };
  User.create(user, function(err){
    if (err) throw err;
    //maxAge is a string that is 'Convenient option for setting the expiry time relative to the current time in milliseconds.'
    //httpOnly is a Boolean that '  Flags the cookie to be accessible only by the web server.'
    res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
    res.send('success');
  });
});


app.post('/login', function(req, res){
  //check username
  //check password
  //create a new token?
  // console.log(req.body);

  // the request body
  var user_login = {
    username: req.body.username
    // password: req.body.password;
  };


  //
  // User.findOne(user_login, function(err, user) {
  //   if(err) throw err;
  //   if(user && bcrypt.compare(req.body.password, user.password, function(err, match){
  //     if (err) throw err; 
  //     console.log(typeof req.body.password);
  //     console.log(user.password);
  //     console.log(match);
      
  //     return match;

  //   })) {
  //     user.access_token = hat();
  //     console.log(access_token);
  //     user.save();
  //     res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
  //     res.send('Successfully Logged In');
  //   } else {
  //     res.send('Invalid Username and Password');
  //   }
  // });


  //new auth

  User.findOne(user_login, function(err, user) {
    if (err) throw err;
    if(bcrypt.compare(req.body.password, user.password, function(err, match){
      console.log(user);
      if (err) throw err;
      console.log(match);
      return match;
    })) {
      console.log('it matches');
      res.send('VALID!');
    } else {
      res.send('Invalid Username and Password');
    }
  });

});


  // var user = {
  //   username: req.body.username,
  //   password:
  //   //asynchronous hash function from bcrypt; pass encrypted and salt used
  //   // bcrypt.genSaltSync(10, function(err, salt){
  //   //   if(err) throw err;
  //   //   bcrypt.hash(req.body.password, null, null, function(err, hash){
  //   //     if(err) throw err;
  //   //     return hash;
  //   //   });
  //   // }),

  //   bcrypt.hashSync(req.body.password, 10, function(err, hash){
  //     if(err) {throw (err)};
  //     return hash;
  //   }),
  //   //randomly generates a token by the hat module
  //   access_token: hat()
  // };
  // User.create(user, function(err){
  //   if (err) throw err;
  //   //maxAge is a string that is 'Convenient option for setting the expiry time relative to the current time in milliseconds.'
  //   //httpOnly is a Boolean that '  Flags the cookie to be accessible only by the web server.'
  //   res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
  //   res.send('success');
  // });


//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/signup


