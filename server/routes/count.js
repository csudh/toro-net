const express = require('express'),
      Count = require('../models/count')

module.exports = (() => {
    'use strict';

    const router = express.Router();

    const countProjection = {
      __v: false,
      _id: false
    }

    router.get('/', checkAuthentication, (req, res) => {
      Count.findOne({}, countProjection, (err, count) => {
        if (err) throw err
        if (!count || count.count === null) {

          const init = new Count({
            count: 0
          })

          init.save(err => {
            if (err) throw err
            res.json({ count: { count: 0 } })
          })
        } else {
          res.json({ count })
        }
      })
    })

    router.post('/', checkAuthentication, (req, res) => {
      const { count } = req.body
      const newScore = count

      Count.findOneAndUpdate({}, { count: newScore }, { projection: countProjection }, (err, score) => {
        if (err) throw err
        res.json({ count: newScore })
      })
    })

    function checkAuthentication(req, res, next) {
      if (req.isAuthenticated()) {
        next()
      }
      else {
        res.redirect('/login')
      }
    }

    return router;
})();
