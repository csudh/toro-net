  const express = require('express'),
        flash = require('req-flash'),
      User = require('../models/user')
        

module.exports = (() => {
    'use strict';

    const router = express.Router();
    router.use(flash());

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
          req.flash("error","User already exists!")
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

        // newUser.save(function(err, newUser) {
				// 	if (err && err.code === 11000) {
        //     let field;
        //     // req.flash("error",{msg: req.t("emailchck")});
        //   }})
				// 		if(err.message.includes(".$")) {
				// 			field = err.message.split(".$")[1];
				// 		}
				// 		else if (err.message.includes("index: ")) {
				// 			field = err.message.split("index: ")[1];
				// 		}
				// 		else {
				// 			req.flash("error", { msg: req.t("UserSaveError") });
				// 			done(err, newUser);
				// 			return
				// 		}
				// 		field = field.split(" dup key")[0];
				// 		field = field.substring(0, field.lastIndexOf("_"));						
				// 		if (field == "email")
				// 			req.flash("error", { msg: req.t("EmailIsExists") });
				// 		else 
				// 			req.flash("error", { msg: req.t("UsernameIsExists") });
				// 	}
				// 	done(err, newUser);
        // })
        
        console.log("newUser created");

        // Attempt to create the new user in the database.
        User.create(newUser, (err) => {
          console.log(newUser)
          if (err) {
              throw err
          }
          req.flash('successMessage', 'User registered successfully.');
          //res.locals.messages= req.flash();
          //res.redirect('/login');
          res.json({ message: 'User registered successfully.' })
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
              
      
              req.flash('success_msg', 'Your password has been reset.');
              res.redirect('/login');
              
          }
      });

    return router;
})();
