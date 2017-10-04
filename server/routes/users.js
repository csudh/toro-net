const express = require('express'),
      User = require('../models/user')

module.exports = (() => {
    'use strict';

    const router = express.Router();

    /* Examples from count.js
    router.get('/', (req, res) => {
      Count.findOne({}, countProjection, (err, count) => {
        if (err) throw err
        if (!count || count.count === null) {

          const init = new Count({
            count: 0
          })

          init.save(err => {
            if (err) throw err
            console.log('Init saved')
            res.json({ count: { count: 0 } })
          })
        } else {
          console.log('Count found: ', count)
          res.json({ count })
        }
      })
    })

    router.post('/', (req, res) => {
      const { count } = req.body
      const newScore = count

      Count.findOneAndUpdate({}, { count: newScore }, { projection: countProjection }, (err, score) => {
        if (err) throw err
        res.json({ count: newScore })
      })
    })
    */

    /* User registration API endpoint */
    router.post('/', (req, res) => {
      // Confirm passwords match.
      if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Passwords do not match!')
        err.status = 400
        throw err
      }

      // If passwords match and all fields are present...
      if (req.body.displayName &&
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        const newUser = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        })

        // Attempt to create the new user in the database.
        User.create(newUser, (err) => {
          if (err) {
            throw err
          }
          res.json({ message: 'User registered successfully.' })
        })
      } else {
        const err = new Error('All fields are required.')
        err.status = 400
        throw err
      }
    })

    return router;
})();
