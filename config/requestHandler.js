//bcrypt for encryption
var bcrypt = require('bcrypt');
//hat for token
var hat = require('hat');

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


//requiring the currently run server
var app = require('../server.js');