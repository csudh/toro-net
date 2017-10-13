const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcryptjs')

var User = new Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
  },
  createdOn: {
    type: Date,
  }
  
})

module.exports = mongoose.model('User', User)
