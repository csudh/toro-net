const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String
  },
  displayName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('User', User)
