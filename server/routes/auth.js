const express = require('express'),
      router = express.Router(),
      passport = require('passport')

/* GitHub */
/********  added scope**************************/
router.get('/github',
  passport.authenticate('github',{
    // scope:['profile']
  }))

// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/')
//   })

//********* changes made for testing
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  })

/* Email/password */
router.post('/local',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  })



module.exports = router
