module.exports = {
  facebook: {
    clientID: "1289342144554197",
    clientSecret: "90f296ed4dc3ceeb6777c599ea3aa129",
    deploy: function() {
      if (process.env.PORT) {
        return "https://cross-app-chat.herokuapp.com/auth/facebook/callback";
      } else {
        return "http://localhost:4000/auth/facebook/callback";
      }
    }
  },
  google: {
    clientID: "443028773086-r2s66717t8b0gg6ilmveqsvl8de62bal.apps.googleusercontent.com",
    clientSecret: "pffo2vvvAGWrPRXu4ZI0ZyKA",
    deploy: function() {
      if (process.env.PORT) {
        return "https://cross-app-chat.herokuapp.com/auth/google/callback";
      } else {
        return "http://localhost:4000/auth/google/callback";
      }
    }
  }
};
