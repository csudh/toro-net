const express = require('express'),
      User = require('../models/user'),
      bcrypt = require('bcryptjs')

module.exports = (() => {
    'use strict';

    const router = express.Router();

    /* User registration API endpoint */
    router.post('/register', (req, res) => {
      /* Vee-validate already takes care of frontend validation, including:
       * - All fields are present
       * - Password and password confirmation fields match
       * - Email field has a valid email address format
       * - Username contains only letters and numbers, no spaces or symbols
       * - Display name contains only letters and numbers, no spaces or symbols
       */
      const newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10), // Hash, not plain!
        createdOn: new Date
      })

      // Attempt to create the new user in the database.
      User.create(newUser, (err) => {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            console.log(err.message)
            //search error message body for error source = 'email' or 'username'
            if (err.message.search('username') != '-1') {
              res.statusMessage = 'username'
              return res.status(409).send()
            }
            else if (err.message.search('email') != '-1') {
              res.statusMessage = 'email'
              return res.status(409).send()
            }  
          }
          throw err
        }

        res.status(200).send()
      })
  })

    return router;
})();
