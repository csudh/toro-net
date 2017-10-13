const express = require('express'),
      router = express.Router(),
      passport = require('passport')
      GitHubStrategy = require('passport-github2').Strategy
      User = require('../models/user')
require('dotenv').load();

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback",
        profileFields : ['displayName','name','email']
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        console.log(profile.name)
        const newuser = User.Create(new User({displayName: profile.name,username:profile.name,email:profile.email,password:'abc',createdOn:new Date}))
        
        process.nextTick(function () {
          
          // To keep the example simple, the user's GitHub profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the GitHub account with a user record in your database,
          // and return that user instead.
          //User.Create(new User({displayName: profile.name,username:profile.name,email:profile.email,password:'abc',createdOn:new Date}))
          return done(null, newuser);
        });
      }
));

passport.serializeUser(function(user, done) {
  done(null, user);
 });
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
 });

/* GitHub */
router.get('/github',
  passport.authenticate('github'))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
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
