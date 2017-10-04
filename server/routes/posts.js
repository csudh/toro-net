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

    router.post('/', (req, res) => {
      const { post } = req.body
      const newPost = post

      Post.create(newPost, (err, post) => {
        if (err) throw err
        res.json({ posts: newPost })
      })
    })

    return router;
})();
