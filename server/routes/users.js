const express = require('express'),
      User = require('../models/user'),
      bcrypt = require('bcryptjs')

module.exports = (() => {
    'use strict'

    const router = express.Router()

    /* Friend addition API endpoint*/
    router.post('/add/friend', (req, res) => {
      /* WARNING: Does not check to see if relationship is already established, may create 
       * duplicate friend relationship. */
      
      /* .env file must be explicity loaded here before the apoc module in order
       *  to succesfully call neo4j */
      require('dotenv').load()
      const apoc = require('apoc')
      
      const queryString = 
        `MATCH (a:User),(b:User) 
        WHERE a.displayName = '${req.body.sDisplayName}' AND b.displayName = '${req.body.tDisplayName}'
        AND a.email='${req.body.sEmail}' AND b.email='${req.body.tEmail}'
        CREATE (a)-[r:FRIEND]->(b)`
      
      const query = apoc.query(queryString)
      query.exec().then((result) => {
        /* Relationship created successfully */
        console.log("SUCCESS", result)
        res.status(200).send()
      }, (fail) => {
        /* Relationship not created */
        console.log("ERROR", fail)
        res.status(500).send()
      })
    })

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
      
      /* .env file must be explicity loaded here before the apoc module in order
       *  to succesfully call neo4j */
      require('dotenv').load()
      const apoc = require('apoc')
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          res.status(499).send()
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
            
            const queryString = `CREATE (u:User { displayName: "${req.body.displayName}", email: "${req.body.email}" })`
            const query = apoc.query(queryString)
            query.exec().then((result) => {
              console.log(result)
            }, (fail) => {
              console.log(fail)
              res.status(666).send()
            })

            res.status(200).send()
          })
        }
      })
  })

    return router;
})()
