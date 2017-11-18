//import { ObjectId } from '../../../../.cache/typescript/2.6/node_modules/@types/bson';

//import { ObjectId } from '../../../../.cache/typescript/2.6/node_modules/@types/bson';

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



    /*endpoint to provide partial list of posts based on keyword search*/
    /* List all Posts Based on Keyword Search */
    router.get('/list/:keyword', (req,res) => {
      console.log("Listing posts who match the search")
      //res.json({message:"User list here!"})
      Post.find({body: {$regex: req.params.keyword}}, function(err, users) {
        if (err) throw err;
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    res.send(JSON.stringify(userMap));
        
      })
    });


//     /* Endpoint: Delete Single Post Based on  */
    /* new attempt */
    router.get('/delete/:id', (req, res) => {
          Post.remove( Post.findById(req.params.id) ,  (err, result) => {
              console.log('Endpoint: Delete Post')
                  if(err){
                    console.log('Error in delete post');
                    res.status(204).send();//No record
                  }
                  else{
                    console.log('No error in delete post');//, result);
                    res.status(200).send();
                    //res.json({result})
                  }
        })
    })//End of Endpoint


    

//     /* Endpoint: Delete Many Posts Based on  */
    /* not working yet */
    router.get('/deleteMany/:id', (req, res) => {
      //Post.find({}, (err, posts) => {
          Post.remove( Post.findById(req.params.id) ,  (err, result) => {
              console.log('Endpoint: Delete Post')
                  if(err){
                    console.log('Error in delete post');
                    res.status(204).send();//No record
                  }
                  else{
                    console.log('No error in delete post');//, result);
                    res.status(200).send();
                    //res.json({result})
                  }
        })
    })//End of Endpoint





    

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
