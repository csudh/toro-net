const GitHubStrategy = require('passport-github').Strategy,
      User = require('./server/models/user'),
      LocalStrategy = require('passport-local').Strategy

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.APP_URL+'auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOne({ 'id': profile.id }, function (err, user) {
        if (err) {
          return done(err)
        }

        if (user) {
          return done(null, user)
        } else {
          var newUser = new User()

          newUser.id = profile.id
          newUser.username = profile.username
          newUser.displayName = profile.displayName
          newUser.email = profile.emails[0].value 

          newUser.save(function (err) {
            if (err) {
              throw err
            }

            return done(null, profile)
          })
        }
      })
    }))

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email: email}, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // if (!user.verifyPassword(password)) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        return done(null, user);
      });
    }
  ))
}
