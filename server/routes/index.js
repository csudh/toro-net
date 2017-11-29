const express = require('express'),
      router = express.Router(),
      path = require('path')

router.get('/isauth', (req, res, next) => {
  if (req.user) {
    res.send(req.user)
  }
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

// Use this function for API endpoint protection.
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

module.exports = router 
module.exports.checkAuth = checkAuth
