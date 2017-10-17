const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      session = require('express-session'),
      count = require('./server/routes/count'),
      auth = require('./server/routes/auth'),
      index = require('./server/routes/index'),
      users = require('./server/routes/users')



require('dotenv').load();
require('./passport')(passport)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

let app = express()

app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {httpOnly: true,maxAge:2495000000}
}))
app.use(cookieParser('test-secret'))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/count', count)
app.use('/', index)
app.use('/users', users)

const port =  process.env.PORT || 3000;
app.listen(port, () => console.log('Running on localhost:', port))
