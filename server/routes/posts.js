

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



    /* Endpoint to provide partial list of posts based on keyword search */
    router.get('/list/:keyword', (req,res) => {
      console.log("Endpoint: Listing Posts Based on Keyword Match ")
     Post.find({body: {$regex: req.params.keyword}}, function(err, posts) {
        if (err) throw err;
        if (!posts || (posts.length<1) ) {
          console.log('Total Posts Found:  ', posts.length)
          console.log('No Post Found matching the keyword.')
          res.json({ posts })   
        }
        else {
          console.log('Total Posts Found:  ', posts.length)
          console.log('')
          console.log('POSTS: ')
          console.log(' ',posts)          
          res.json({ posts })
        }        
      })
    });//End Endpoint




    /* Endpoint: Delete Single Post Based on  */
    /* new attempt */
    router.get('/delete/:id', (req, res) => {
          Post.remove( Post.findById(req.params.id) ,  (err, result) => {
              console.log('Endpoint: Delete Post')
                  if(err){
                    console.log('Error in delete post');
                    res.status(204).send();//No record
                  }
                  else{
                    console.log('Success in Delete Post');//, result);
                    res.status(200).send();
                    //res.json({result})
                  }
        })
    })//End of Endpoint


    

    /* Endpoint: Delete Many Posts Based on  */
    /* not working yet */
    /* ~TEMP~ Delete Many Posts */
    router.post('/deleteMany', (req, res) => {   
      /* json data */
      var errorsInDeleting=false;
      console.log('Endpoint: Delete Many Posts')      
      for(var key in req.body.deleteIds){
        var idToDelete = req.body.deleteIds[key]
        console.log('ID :  ', idToDelete )

        /* Delete One ID */
        Post.remove( Post.findById( idToDelete ) , (err, result) => {
          if(err){
            console.log('Failure (Error): Delete Post ', err);
            //res.status(204).send();//No record
          }
          if(!result){//.length<1){//} || result.length<1){
            console.log('FAIL: No Results')
            console.log('FAIL: Did Not Delete ID: ', idToDelete)
            errorsInDeleting=true;
            //res.status(204).send();//No record
          }
          else{
            console.log('Success in Delete Post');//, result);
            console.log('Deleted Post ID:', idToDelete )
            res.status(200).send();
          }
        })

        /* try find [2] */
        // Post.find( Post.findById( idToDelete ) , function(err, posts) {
        //   if (err) throw err;
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

    })//End Endpoint

     

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

    router.get('/:id', (req, res) => {
      
          Post.find( Post.findById(req.params.id) ,  (err, result) => {
            console.log('Endpoint: Read Post')
                if(err){
                  console.log("Post record doesn't exist!");
                  res.status(204).send();
                }
                else{
                  console.log('Post found');
                  res.send(JSON.stringify(result));
                }
          })
        })    


    return router;
})
();
