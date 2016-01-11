var mongoose = require('mongoose');

//creating the schema for the users
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  session: {
    type: String
    //or type: Object if the whole Session Object is saved?
    // ,
    // required: true
  },
  shows: {
    type: []
  }
});

//mongoose model for users utilizing users schema
module.exports = mongoose.model('users', UserSchema);

