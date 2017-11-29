const express = require('express'),
      Post = require('../models/post')

// Functions imported with 'require' must be set to var, not const.
var checkAuth = require('./index.js').checkAuth

module.exports = (() => {

  'use strict';
  
  const router = express.Router();

  const postsProjection = {
      __v: false,
  }
  
  router.get('/', checkAuth, (req, res) => {
    Post.find({}, postsProjection, (err, posts) => {
      if (err) throw err
      else {
        res.json({ posts })
      }
    })
  })
  
  /* Endpoint to provide partial list of posts based on keyword search. */
  router.get('/list/:keyword', checkAuth, (req,res) => {
    const regex = { $regex: req.params.keyword }
    Post.find({$or: [{ title: regex }, { body: regex }]}, 
      postsProjection, (err, posts) => {
      if (err) throw err
      if (!posts || (posts.length < 1) ) {
        res.json({ posts })   
      }
      else {
        res.json({ posts })
      }        
    })
  })
  
  /* Endpoint: Delete single post based on new attempt. */
  router.get('/delete/:id', checkAuth, (req, res) => {
    Post.remove( Post.findById(req.params.id), postsProjection,
      (err, result) => {
      console.log('Endpoint: Delete Post')
      if (err) {
        console.log('Error in delete post')
        res.status(204).send() 
      }
      else {
        console.log('Success in Delete Post') //, result)
        res.status(200).send()
        //res.json({result})
      }
    })
  })
  
  /* Endpoint: Delete Many Posts Based on  */
  /* not working yet */
  /* ~TEMP~ Delete Many Posts */
  router.post('/deleteMany', checkAuth, (req, res) => {   
    /* json data */
    var errorsInDeleting=false
    console.log('Endpoint: Delete Many Posts')      
    for(var key in req.body.deleteIds) {
      var idToDelete = req.body.deleteIds[key]
      console.log('ID :  ', idToDelete )

      /* Delete One ID */
      Post.remove(Post.findById(idToDelete), postsProjection, 
        (err, result) => {
        if (err) {
          console.log('Failure (Error): Delete Post ', err)
          //res.status(204).send()//No record
        }
        if (!result) {//.length<1) {//} || result.length<1) {
          console.log('FAIL: No Results')
          console.log('FAIL: Did Not Delete ID: ', idToDelete)
          errorsInDeleting=true
          //res.status(204).send()//No record
        }
        else {
          console.log('Success in Delete Post')//, result)
          console.log('Deleted Post ID:', idToDelete )
          //res.status(200).send()
        }
      })

      /* try find [2] */
      // Post.find( Post.findById( idToDelete ) , function(err, posts) {
      //   if (err) throw err
      //   if (!posts || (posts.length<1) ) {
      //     console.log('Total Posts Found:  ', posts.length)
      //     console.log('No Post Found matching the keyword.')
      //     //res.json({ posts })   
      //   }
      //   else {
      //     console.log('Total Posts Found:  ', posts.length)
      //     console.log('')
      //     console.log('POSTS: ')
      //     console.log(' ',posts)    
      //     Post.remove( Post.findById( idToDelete ) ,(err, result) => {} )      
      //     //res.json({ posts })
      //   }        
      // })
      /*  */

    } //End for
    res.json({})       
  })
  
  router.post('/create', checkAuth, (req, res) => {
    const newPost = new Post({
      userId: req.user.id,
      title: req.body.title,
      body: req.body.body,
      createdOn: new Date
    })
    console.log("Post created.")
    Post.create(newPost, postsProjection, (err) => {
      console.log(newPost)
      if (err) {
        res.status(409).send()
        throw err
      }
      else {
        res.status(200).send()
      }
    })
  })
  
  router.put('/update/:id', checkAuth, (req, res, next) => {
    console.log("EndPoint : update Post")
    Post.update(Post.findById(req.params.id), req.body, (err, result) => {
    if (err) {
      console.log("Post record doesn't exist!")
      res.status(204).send()
    }
    else {
      console.log("success")
      res.status(200).send()
    }
    })
  })
  
  router.get('/:id', checkAuth, (req, res) => {
    Post.find(Post.findById(req.params.id), postsProjection,  
      (err, result) => {
      console.log('Endpoint: Read Post')
      if (err) {
        console.log("Post record doesn't exist!")
        res.status(204).send()
      }
      else {
        console.log('Post found')
        res.send(JSON.stringify(result))
      }
    })
  })    
  
  return router
})()
