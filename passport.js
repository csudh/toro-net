const GitHubStrategy = require('passport-github').Strategy,
      User = require('./server/models/user'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs')

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  /* GitHub authentication strategy using OAuth tokens. */
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.APP_URL+'auth/github/callback',
    scope: ['user:email']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ id: profile.id }, function (err, user) {
        if (err) {
          return done(err)
        }

        if (user) {
          return done(null, profile)
        } else {
          const newUser = new User({
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            createdOn: new Date
          })

          User.create(newUser, function (err) {
            if (err) {
              throw err
            }

            return done(null, profile)
          })
        }
      })
    }))

  /* Local authentication strategy using email/password. */
  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) { 
          return done(err)
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false)
        }

        return done(null, user)
      })
    }
  ))
}
