const passport = require("passport");
const User = require("../models/user");
const LocalStategy = require("passport-local").Strategy;
const bcrytjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  "local.signup",
  new LocalStategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        // var token = jwt.sign({ id: user._id }, "key");
        // user.token = _.join(["LC", token], "|");
        return done(null, { haha: "user ton tai", code: 1 });
      }
      const newUser = new User();
      newUser.username = email;
      newUser.fullname = email;
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      var token = jwt.sign({ id: newUser._id }, "key");
      newUser.token = _.join(["LC", token], "|");
      newUser.save(err => {
        done(null, newUser);
      });
    });
  })
);
passport.use(
  "local.signin",
  new LocalStategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(null, { haha: "not user" });
      }
      if (!user || !user.comparePassword(password)) {
        return done(null, { haha: "wrong pass" });
      }
      console.log(user)
      if (user.block != true) {
        var token = jwt.sign({ id: user._id }, "key");
        user.token = _.join(["LC", token], "|");
        // var decoded = jwt.verify(token, 'shhhhh');
        //console.log(user);
        return done(null, user);
      }
      else return done(null, { haha: "you account hasd bloc" })
    });
  })
);
