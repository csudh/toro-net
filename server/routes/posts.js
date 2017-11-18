const express = require('express'),
      Post = require('../models/post')

module.exports = (() => {
    'use strict'

    const router = express.Router()

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
      post.create(newPost, (err) => {
        console.log(newPost)
        if (err) {
            throw err
        }
        res.status(200).send();
      })
    
    })

    /*router.post('/delete/post=<post_id>', (req, res) => {
      console.log("hi");
      const deletePost = new Post({
        //user: req.params.user,
        post_id: req.body.Post_id,
        //createdOn: new Date
      })
      
      console.log(req.body);

      // Attempt to delete an existing post in the database.
      post.remove(deletePost, (res) => {
        console.log(deletePost)
        if (err) {
            const err = new Error("Post record doesn't exists!")
            err.status = 204
            res.json({ message: "Post record doesn't exists!" })
        }
        res.status(200).send();
      });
    });*/
      router.delete('/delete/post=<post_id>',(req,res)=>{
        var id= req.params.id;

        Post.findByIdAndRemove(id).then((Post)=>{
          res.status(200).send({Post});
          console.log({Post});
        }).catch((e)=>{

res.status(400).send();
        });
    
    });

    return router;
})();
