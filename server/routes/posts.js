const express = require('express'),
      Post = require('../models/post')

module.exports = (() => {
    'use strict';

    const router = express.Router();

    const postProjection = {
      __v: false,
      _id: false
    }

    router.get('/', (req, res) => {
      Post.find({}, (err, posts) => {
        if (err) throw err
        if (!posts) {
          const init = new Post({
            id: 0,
            username: 'ragingbull',
            displayName: 'Raging Bull',
            date: Date.now(),
            title: 'Greetings from California State University, ' +
              'Dominguez Hills in Carson, CA!',
            body: 'This post serves as a placeholder.'
          })

          init.save(err => {
            if (err) throw err
            console.log('Sample post initialized.')
            res.json({ posts: init })
          })
        }
        else {
          console.log('Posts retrieved: ', posts)
          res.json({ posts })
        }
      })
    })

    router.post('/create', (req, res) => {
      
      const newPost = new Post({
        user: req.body.user,
        title: req.body.title,
        body: req.body.body,
        createdOn: new Date
      })
    

      
      
      console.log(req.body);

      // Attempt to create the new user in the database.
      Post.create(newPost, (err) => {
        console.log(newPost)
        if (err) {
            throw err
        }
        res.status(200).send();
      })
    
    })

    return router;
})();
