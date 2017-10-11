const express = require('express'),
      router = express.Router(),
      passport = require('passport')
      GitHubStrategy = require('passport-github2').Strategy
      GITHUB_ID = "6532802d32e7e1038af2"
      GITHUB_SECRET = "f3282c8baa4a75f25af2313a4edb08a874165d03"

passport.serializeUser(function(user, done) {
        done(null, user);
       });
       
passport.deserializeUser(function(obj, done) {
        done(null, obj);
       });
passport.use(new GitHubStrategy({
        clientID: GITHUB_ID,
        clientSecret: GITHUB_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          
          // To keep the example simple, the user's GitHub profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the GitHub account with a user record in your database,
          // and return that user instead.
          return done(null, profile);
        });
      }
));

/* GitHub */
router.get('/github',
  passport.authenticate('github',{scope: [ 'user:email' ]}))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

/* Email/password */
router.post('/local',
  passport.authenticate('local', { failureRedirect: '/login' , successRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

module.exports = router
