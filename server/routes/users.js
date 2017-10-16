const express = require('express'),
      User = require('../models/user')

module.exports = (() => {
    'use strict';

    const router = express.Router();

    /* User registration API endpoint */
    router.post('/', (req, res) => {
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
        password: req.body.password,
        createdOn: new Date
      })

      // Attempt to create the new user in the database.
      User.create(newUser, (err) => {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).send()
          }
          throw err
        }

        res.status(200).send()
      })
  })

    return router;
})();
