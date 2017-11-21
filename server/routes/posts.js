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

console.log("post created");
Post.create(newPost, (err) => {
  console.log(newPost)
  if (err) {
      throw err
  }
  res.status(200).send();
})
})

// Update POST 
router.put('/update/:id', (req, res, next) => {

  console.log("EndPoint : update Post");

  Post.update(Post.findById(req.params.id),req.body, (err, result) => {

    if (err) {
      console.log("Post record doesn't exist!");
      res.status(204).send();
             }
    else{
     
      console.log("success");
      res.status(200).send();
           
        }
  })
  })
return router;
})();

    router.get('/:id', (req, res) => {
  
      Post.find( Post.findById(req.params.id) ,  (err, result) => {
        console.log('Endpoint: Read Post')
            if(err){
              console.log("Post record doesn't exist!");
              res.status(204).send();
            }
            else{
              console.log('Post found');
              res.status(200).send();
            }
      })
    })
      

    return router;
})();

