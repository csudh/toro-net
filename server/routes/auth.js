const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      expressValidator = require('express-validator'),
      LocalStrategy = require('passport-local').Strategy,
      GitHubStrategy = require('passport-github2').Strategy,
      User = require('../models/user')


router.use(expressValidator());
require('dotenv').load();

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
  
    req.checkBody('email', 'Invalid email.').notEmpty()
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
