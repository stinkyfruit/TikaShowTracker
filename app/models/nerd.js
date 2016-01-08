var mongoose = require('mongoose');

//creating the schema for the users
var usersSchema = mongoose.Schema({
  name: String,
  password: String
});

//mongoose model for users utilizing users schema
module.exports = mongoose.model('User', usersSchema);