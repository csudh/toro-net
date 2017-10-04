const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var Post = new Schema({
  id: String,
  username: String,
  email: String,
  displayName: String,
  date: Date,
  title: { type: String, required: true },
  body: { type: String, required: true }
})

module.exports = mongoose.model('Post', Post)
