const express = require('express'),
      router = express.Router(),
      passport = require('passport')
      GitHubStrategy = require('passport-github').Strategy,
      User = require('../models/user'),
      LocalStrategy = require('passport-local').Strategy

/* GitHub */
router.get('/github',
  passport.authenticate('github'))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

/* Email/password */
router.post('/local',
  passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }),
  function(req, res) {
    console.log("Success");
    res.redirect('/');
  })

module.exports = router
