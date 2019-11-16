const passport = require("passport");
const User = require("../models/user");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const FacebookStategy = require("passport-facebook").Strategy;
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new FacebookStategy(
    {
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      profileFields: ["email", "displayName", "photos"],
      callbackURL: keys.facebook.deploy()
    },
    (token, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          var token = jwt.sign({ id: user._id }, "key");
          user.token = _.join(["FB", token], "|");
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.facebook = profile.id;
          newUser.fullname = profile.displayName;
          newUser.username = profile.displayName;
          newUser.email = profile._json.email;
          newUser.userImage = profile.photos[0].value;
          //newUser.fbToken.push({token:token});
          var token = jwt.sign({ id: user._id }, "key");
          newUser.token = _.join(["FB", token], "|");
          newUser.save(err => {
            return done(null, newUser);
          });
        }
      });
    }
  )
);
