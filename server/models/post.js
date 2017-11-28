const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      User = require('../models/user')

var Post = new Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  createdOn:{
    type: Date
    required: true,
  }
})

module.exports = mongoose.model('Post', Post)
