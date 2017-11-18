<<<<<<< HEAD
  const express = require('express'),
        flash = require('req-flash'),
      User = require('../models/user')
        
=======
const express = require('express'),
      User = require('../models/user'),
      bcrypt = require('bcryptjs')
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043

module.exports = (() => {
    'use strict'

<<<<<<< HEAD
    const router = express.Router();
   
    /* User listing endpoint */
    router.get('/list/all', (req,res) => {
           
      User.find({}, function(err,users){
          if (err) throw err;
          else {
            var userMap = {};
            
                users.forEach(function(user) {
                  userMap[user._id] = user;
                });
            res.send(JSON.stringify(userMap));         
          }
        })
    })


    /*endpoint to provide partial list of useres based on keyword search*/
    router.get('/list/:keyword', (req,res) => {
      console.log("Listing users who matched the search")
      //res.json({message:"User list here!"})
      User.find({username: {$regex: req.params.keyword}}, function(err, users) {
        if (err) throw err;
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    res.send(JSON.stringify(userMap));
     
      })
    });
    

    /* User registration API endpoint */
    router.post('/register', (req, res) => {
      // Confirm passwords match.
      
     /* if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Passwords do not match!')
        err.status = 400
        throw err
      }*/

      // If user already exists...
      User.find({email : req.body.email}, function(err, docs)  {
        
        if(docs.length){
          const err = new Error('User already exists!')
          err.status = 400
          res.json({ message: 'User already exists!' })
          
          //res.locals.messages=req.flash()
          //res.render('register',{title: "Register"});
        }
     else{

        const newUser = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          question1: req.body.question1,
          question2: req.body.question2,
          question3: req.body.question3,
          createdOn: new Date
        })

        
        
        console.log("newUser created");

        // Attempt to create the new user in the database.
        User.create(newUser, (err) => {
          console.log(newUser)
          if (err) {
              throw err
          }
          res.status(200).send();
          //res.locals.messages= req.flash();
          //res.redirect('/login');
          //res.json({ message: 'User registered successfully.' })
        })
      }
    })
    })
    router.post('/reset', function(req, res){
      var password = req.body.password;
      var password2 = req.body.password2;
  
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
      
      var errors = req.validationErrors();
      
          if(errors){
              res.render('login',{
                  errors:errors
              });
          } else {
              res.redirect('/login');
              
          }
      });
=======
    const router = express.Router()

    /* User registration API endpoint */
    router.post('/register', (req, res) => {
      /* Vee-validate already takes care of frontend validation, including:
       * - All fields are present
       * - Password and password confirmation fields match
       * - Email field has a valid email address format
       * - Username contains only letters and numbers, no spaces or symbols
       * - Display name contains only letters and numbers, no spaces or symbols
       */
      
      /* Hash User password first and then create User object to store in DB on 
       * hash success */
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          res.status(409).send()
        }
        else {
          const newUser = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            username: req.body.username,
            password: hash, // Hash, not plain!
            createdOn: new Date
          })

          User.create(newUser, (err) => {
            if (err) {
              if (err.name === 'MongoError' && err.code === 11000) {
                //search error message body for error source = 'email' or 'username'
                if (err.message.search('username') != '-1') {
                  res.statusMessage = 'username'
                  return res.status(409).send()
                }
                else if (err.message.search('email') != '-1') {
                  res.statusMessage = 'email'
                  return res.status(409).send()
                }  
              }
              
              /* Error message not displayed by default, included this to make stack trace 
               * more descriptive */
              console.log(err.message)
              throw err
            }
    
            res.status(200).send()
          })
        }
      })
  })
>>>>>>> 2db63b24b81a3019a4e03a2c100d9170107c4043

    return router;
})()
