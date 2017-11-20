
const express = require('express'),
      Post = require('../models/post')

      var mongodb = require('mongodb'); 

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


    

//     /* Endpoint: Delete Many Posts Based on  */
    /* not working yet */
    /* ~TEMP~ Delete Many Posts */
    router.post('/deleteMany', (req, res) => {   
      /* Store json data */
      //var dataStringify = JSON.stringify(req)
      // //data.for()
      // for(var key in data){
      //   var value = data[key]
      //   console.log('Data found: ', value)

      // }
      
      /* retrieve */
      //console.lot('test: ', dataParse)
      console.log('Request received is :  ', req.body)
       
    })//End Endpoint



    

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
