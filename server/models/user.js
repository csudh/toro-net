const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcryptjs')

var User = new Schema({
  id: {
    type: String
  },
  email: {
    type: String,
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
    // required: true
  },
  displayName: {
    type: String
    // required: true
  },
  createdOn: {
    type: Date,
    // required: true
  }
})

module.exports = mongoose.model('User', User)
