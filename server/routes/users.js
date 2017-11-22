const express = require('express'),
      User = require('../models/user'),
      bcrypt = require('bcryptjs')

/* apoc require statement must always go after the explicit loading of the 
 * .env file */
require('dotenv').load()
const apoc = require('apoc')

module.exports = (() => {
    'use strict'

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
            
            /* Creates a cypher query in order to add new user to friend graph */
            const queryString = `CREATE (u:User { username: "${req.body.username}" })`
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

    /* Friend addition API endpoint*/
    router.post('/add/friend', (req, res) => {
      /* WARNING: Does not check to see if relationship is already established, may create 
      * duplicate friend relationship. */
      
      const queryString = 
        `MATCH (a:User),(b:User) 
        WHERE a.username = '${req.body.sUsername}' AND b.username = '${req.body.tUsername}'
        CREATE (a)-[r:isFriends {connects:a.username + "<-->" + b.username}]->(b)`
      
      const query = apoc.query(queryString)
      query.exec().then((result) => {
        res.status(200).send()
      }, (fail) => {
        res.status(500).send()
      })
    })

    /* Friend list API endpoint */
    router.get('/list/friend/:username/:degree', (req, res) => {
      /* Returns a list of friends for the username specified in the path. If the
       * degree parameter is 2 it returns friends-of-friends and so on for larger 
       * values. List returned does not include relationship details. 
       */

      const queryString = 
        `MATCH (a:User), (b:User)
        WHERE a.username="${req.params['username']}" and (a) -[:friend*1..${req.params['degree']}]- (b)
        RETURN distinct b.username`
      const query = apoc.query(queryString)

      query.exec().then((result) => {
        const resultArray = []
        const dataLength = result[0]['data'].length
        for (var i = 0; i < dataLength; i++) {
          resultArray.push(result[0]['data'][i]['row'][0])
        }

        res.json({
          'data': resultArray,
          'length': dataLength
        })
      }, (fail) => {
        console.log(fail)
      })
    })
    
    /* Friend graph API endpoint */
    router.get('/list/friend/connections/:username/:degree', (req, res) => {
      /* Returns a JSON object where each key is a user in the friend graph and 
       * each value is a list of users the key user is connected to. */

      const queryString = 
        `MATCH (u:User {username: '${req.params['username']}'})-[r:friend*1..${req.params['degree']}]-(v:User)
        WHERE u <> v
        RETURN r`
      const query = apoc.query(queryString)
      
      query.exec().then((result) => {
        var resultMap = new Map()
        for (var i = 0; i < result[0]['data'].length; i++) {
          const dataList = result[0]['data'][i]['row'][0]
          for (var j = 0; j < dataList.length; j ++) {
            var rowNames = dataList[j]['connects'].split('<-->')
            rowNames = rowNames.sort()
            if ( resultMap.has(rowNames[0]) ) {
              if ( !resultMap.get(rowNames[0]).includes(rowNames[1]) ) {
                resultMap.get(rowNames[0]).push(rowNames[1])
              }
            } else {
              resultMap.set(rowNames[0], [rowNames[1]])
            }
          }
        }
        var jsonObj = {}
        resultMap.forEach((value, key) => {
          jsonObj[key] = value
        })
        res.json(jsonObj)
      }, (fail) => {
        console.log(fail) 
      })
    })
    
    
    return router;
})();
