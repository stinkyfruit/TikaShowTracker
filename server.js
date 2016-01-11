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
// var hat = require('hat');
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
  //Check if user exists
    //if user exists
      //route to main page '/'
    // else stay on signup
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
    //create a session for user now set to _expires.
    user.session = req.session.cookie._expires;
    //create user in database with mongoose .create()
    User.create(user, function(err){
      if (err) { 
        console.log(err);
        throw err;
      }
      //log user
      console.log(user);
      // what you will see from the terminal when user is consoled:
      // { username: 'afasf@dfaf.com',
      //  password: '$2a$10$4ugpuyCxQMt5QPKdDkL9L.KdK00xSLUbQ1b/12e1b7JKwxD9VanQ2',
      //  session: 
      //    Session {
      //      cookie: 
      //       { path: '/',
      //        _expires: Mon Jan 11 2016 00:45:26 GMT-0800 (PST),
      //        originalMaxAge: 60000,
      //        httpOnly: true 
      //       } 
      //     } 
      // }
      // // redirect to main page
      // res.redirect("/");
      // send response
      res.send('success');
    });
  });
});

// POST for login
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
      // //give use a token
      // user.access_token = hat();
      //mongoose .save() the info to the db collection
      user.save();
      // //create cookie session
      // res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});

      //Check session
        //if need, set the user.session to equal to session (or a propert of session)..

      //redirect to the main page
      res.redirect("/");
      console.log('LOGGED IN!');
      // res.send('LOGGED IN!');
    } else {
      //give an error
      res.send('CANNOT LOG IN!');
    }
    });
  });
});

// GET for logout 
app.get('/logout', function(req, res){
  // session.destroy() to kill session
  // route to '/login'
  }
);


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










///Last version -------------------


//Modules removed in latest version
// var cookieParser = require('cookie-parser');
// var hat = require('hat');

// //connect to local database
// var database = 'mongodb://localhost/bugatti';
// mongoose.connect(database, function(err, result){
//   if(err) return err;
//   console.log('Successfully connected to DB');
// });

// var port = process.env.PORT || 3000;
// app.listen(port);
// console.log('LISTENING TO PORT' + port);

// //to see the requests in console
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cookieParser());

// //shall we require our routes here?
// // require('./public/js/appRoutes')

// app.use(express.static(__dirname + '/public'));

// //POST for signup
// app.post('/signup', function(req, res){
//   var user = {
//     //username is set to the request body's username
//     username: req.body.username,
//     //password is set to the hashed password syncronously
//     password: bcrypt.hashSync(req.body.password, 10, function(err, hash){
//       if(err) {throw (err)};
//       return hash;
//     }),
//     //randomly generates a token by the hat module
//     access_token: hat()
//   };
//   //mongoose .create()
//   User.create(user, function(err){
//     if (err) throw err;
//     //maxAge = expiration time in ms & httpOnly is boolean to flag cookie for server
//     res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});
//     res.send('success');
//   });
// });

// POST for login
// app.post('/login', function(req, res){
//   var user_login = {
//     username: req.body.username
//   };

//   //mongoose .findOne()
//   User.findOne(user_login, function(err, user) {
//     if (err) throw err;
//     //ascyhronous bcrypt compare 
//     bcrypt.compare(req.body.password, user.password, function(err, match){
//       if (err) throw err;
//       //check if the match is true
//       if (match){
//       //give use a token
//       user.access_token = hat();
//       //mongoose .save() the info to the db collection
//       user.save();
//       //create cookie session
//       res.cookie('access_token', user.access_token, {maxAge: 900000, httpOnly: true});

//       res.send('Logged in!');
//     } else {
//       res.send('Cannot log in!');
//     }
//     });
//   });
// });

// //for when front end posts to api/shows - this is when the user selects a show to follow
// app.post('/api/shows', function(req, res){
//   // User.findOne(req.body.user, function(err, user){
//   //   if(err) throw err;
//     request('http://www.omdbapi.com/?i='+req.body.imdbID, function(error, res, body){
//       if (error) throw error;
//       console.log(body);
//     });
//     res.send('Show saved to the database');
//   // });
// });


