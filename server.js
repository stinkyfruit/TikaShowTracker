//Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to our database through modulus.io
mongoose.connect('mongodb://bugatti1:aitk@apollo.modulusmongo.net:27017/jewYsy4m');

//create a port 
var port = process.env.PORT || 3000;
//start server
app.listen(port);
console.log('LISTENING TO PORT' + port);