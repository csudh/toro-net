const GitHubStrategy = require('passport-github').Strategy,
      User = require('./server/models/user'),
      LocalStrategy = require('passport-local').Strategy
      bcrypt = require('bcryptjs')

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  /* GitHub authentication strategy using OAuth2 tokens. */
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.APP_URL+'auth/github/callback',
    scope: ['user:email']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) {
          return done(err)
        }
        else if (user) {
          return done(null, user)
        } 
        else {
          const newUser = new User({
            username : profile.username,
            displayName : profile.displayName,
            email: profile.emails[0].value,
            createdOn: new Date
          })

          User.create(newUser, function(err) {
            if (err) {
              throw err
            }

            return done(null, user)
          })
        }
      })
    })
  )

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email: email}, (err, user) => {
        if (err) { 
          return done(err) 
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false)
        }

        bcrypt.compare(password, user.password, function(err, res) {
          if (err) {
            return done(null, false)
          }
          else {
            return done(null, user)
          }
        })
      })
    }
  ))
}
