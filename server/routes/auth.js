const express = require('express'),
      router = express.Router(),
      passport = require('passport')

/* GitHub */
router.get('/github',
  passport.authenticate('github'))

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }), 
  function(req, res) {
    res.redirect('/counter')
  })

/* Email/password */
router.post('/local', 
  passport.authenticate('local', { failureRedirect: '/login' }), 
  function(req, res) {
    res.redirect('/counter')
  })

module.exports = router
