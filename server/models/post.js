const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var Post = new Schema({
  id: String,
  username: String,
  email: String,
  displayName: String,
  question1: String,
  question2: String,
  question3: String,
  date: Date,
  title: { type: String, required: true },
  body: { type: String, required: true }
})

module.exports = mongoose.model('Post', Post)
