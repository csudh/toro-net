const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var User = new Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
<<<<<<< HEAD
=======
    required: true,
    unique: true,
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
    trim: true
  },
  username: {
    type: String,
<<<<<<< HEAD
    trim: true
  },
  password: {
    type: String,
=======
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
  },
  question1: {
    type: String,
<<<<<<< HEAD
=======
    required: true
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
  },
  question2: {
    type: String,
  },
  question3: {
    type: String,
  },  
  createdOn: {
    type: Date,
<<<<<<< HEAD
=======
    required: true
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043
  }
  
})

module.exports = mongoose.model('User', User)
