const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcryptjs')

var User = new Schema({
  id: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true, // Sets email to the index key; NOT a validator!
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    // required: true
  }
})

module.exports = mongoose.model('User', User)
