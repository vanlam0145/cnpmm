const passport = require("passport");
const User = require("../models/user");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const GoogleStategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new GoogleStategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      //profileFields: ['email', 'displayName','photos'],
      callbackURL: keys.google.deploy()
      //passReqToCallback: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          var token = jwt.sign({ id: user._id }, "key");
          user.token = _.join(["GG", token], "|");
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.google = profile.id;
          newUser.fullname = profile.displayName;
          newUser.username = profile.displayName;
          newUser.email = profile._json.email;
          newUser.userImage = profile._json.picture;
          newUser.ggTokens.push({ token: token });
          var token = jwt.sign({ id: newUser._id }, "key");
          newUser.token = _.join(["GG", token], "|");
          newUser.save(err => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);
