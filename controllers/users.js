"use strict";
var jwt = require("jsonwebtoken");
module.exports = function (_, passport, User) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/signup", this.getSignup);

      router.get("/test", this.testPage);
      router.post("/test", this.postTestPage);

      router.get("/auth/facebook", this.getFacebookLogin);
      router.get("/auth/facebook/callback", this.facebookLogin, function (req, res) {
        console.log(req.user.token);
        res.redirect("http://localhost:3000/login?token=" + req.user.token);
      });
      router.get("/auth/google", this.getGoogleLogin);
      router.get("/auth/google/callback", this.GoogleLogin, function (req, res) {
        res.redirect("http://localhost:3000/login?token=" + req.user.token);
      });

      router.post("/", this.postSignin, function (req, res) {
        if (req.user.token) res.json(req.user.token);
        else res.json(false);
      });
      router.post("/signup", this.postSignup, function (req, res) {
        if (req.user.code == 1) res.json(req.user);
        else res.json(req.user.token);
      });
    },
    testPage: function (req, res) {
      res.render("loginWithFireBase");
    },
    postTestPage: function (req, res) {
      console.log("log" + req.body.email + " " + req.body.password);
    },
    indexPage: function (req, res) {
      const errors = req.flash("error");
      return res.render("index", {
        title: "chat test",
        messages: errors,
        hasErrors: errors.length > 0
      });
    },

    getSignup: function (req, res) {
      const errors = req.flash("error");
      return res.render("signup", {
        title: "chat test",
        messages: errors,
        hasErrors: errors.length > 0
      });
    },
    getFacebookLogin: passport.authenticate("facebook", {
      scope: ["email"]
    }),
    facebookLogin: passport.authenticate("facebook", {
      failureRedirect: "/",
      session: false
    }),
    getGoogleLogin: passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ]
    }),
    GoogleLogin: passport.authenticate("google", {
      failureRedirect: "/",
      session: false
    }),

    postSignup: passport.authenticate("local.signup", {
      failureRedirect: "http://localhost:3000/signup",
      session: false
    }),
    postSignin: passport.authenticate("local.signin", {
      failureRedirect: "/",
      session: false
    })
  };
};
