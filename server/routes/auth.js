const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      expressValidator = require('express-validator'),
      LocalStrategy = require('passport-local').Strategy,
      GitHubStrategy = require('passport-github2').Strategy,
      User = require('../models/user')


router.use(expressValidator());
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

  router.post('/forgot', function(req, res){
    var email = req.body.email;
    var question = req.body.question;
    var question2 = req.body.question2;
    var question3 = req.body.question3;
  
    req.checkBody('email', 'Invalid email').notEmpty();
    req.checkBody('question', 'Answer to security question is required').notEmpty();
    req.checkBody('question2', 'Answer to security question is required').notEmpty();
    req.checkBody('question3', 'Answer to security question is required').notEmpty();
  
      passport.use(new LocalStrategy(
          function(email, question, question2, question3, done) {
           User.getUserByemail(email, function(err, user){
               if(err) throw err;
               if(!user){
                   return done(null, false, {message: 'invalid email'});
               }
        
               User.comparequestion(question, user.question, function(err, isMatch){
                   if(err) throw err;
                   if(isMatch){
                       return done(null, user);
                   } else {
                       return done(null, false, {message: 'Answer donot match'});
                   }
               });
               User.comparequestion2(question2, user.question2, function(err, isMatch){
                  if(err) throw err;
                  if(isMatch){
                      return done(null, user);
                  } else {
                      return done(null, false, {message: 'Answer donot match'});
                  }
              });
              User.comparequestion3(question3, user.question3, function(err, isMatch){
                  if(err) throw err;
                  if(isMatch){
                      return done(null, user);
                  } else {
                      return done(null, false, {message: 'Answer donot match'});
                  }
              });
           });
          }));
          
      var errors = req.validationErrors();
      
      if(errors){
      res.render('login',{
        errors:errors
      });
    } else {
      
      }
      User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
              return done(null, user);
          } else {
              return done(null, false, {message: 'Invalid password'});
          }
      });
      res.redirect('/users/reset');
  });

module.exports = router
