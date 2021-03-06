const express = require("express");
const bodyParse = require("body-parser");
const http = require("http");
const https = require("https");
const fs = require("fs");
const cookieParse = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const container = require("./container");
const passport = require("passport");
const socketIO = require("socket.io");
const { Users } = require("./helpers/UsersClass");
const { Global } = require("./helpers/Global");
const morgan = require("morgan");
const cors = require("cors");
container.resolve(function (users, _, admin, home, group, routerExportReqToDoc) {
  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const port = process.env.PORT || 4000;
    mongoose
      .connect("mongodb+srv://cross:123xyz@cluster0-lstqi.mongodb.net/chat?retryWrites=true", {
        useNewUrlParser: true
      })
      .then(() => console.log("MongoDB successfully connected"))
      .catch(err => console.log(err));
    var secureIO;
    // if (process.env.PORT) {
    const server = http.createServer(app);
    secureIO = socketIO(server);
    server.listen(port, function () {
      console.log(`server run on port : ${port}!!!`);
    });
    // } else {
    //   app.set('port', port);
    //   app.set('secPort', port + 443);
    //   var option = {
    //     key: fs.readFileSync('config/private.key'),
    //     cert: fs.readFileSync('config/certificate.pem')
    //   };
    //   const secureServer = https.createServer(option, app);
    //   secureServer.listen(app.get('secPort'), () => {
    //     console.log(`Secure server listening on port`, app.get('secPort'));
    //   });
    //   secureIO = socketIO(secureServer);
    // }
    ConfigureExpress(app);
    require("./socket/groupchat")(secureIO, Users);
    require("./socket/friend")(secureIO);
    require("./socket/globalroom")(secureIO, Global, _);
    const router = require("express-promise-router")();
    users.SetRouting(router);
    admin.SetRouting(router);
    home.SetRouting(router);
    group.SetRouting(router);
    routerExportReqToDoc.SetRouting(router);
    app.use(router);
  }

  function ConfigureExpress(app) {
    require("./passport/passport-local");
    require("./passport/passport-facebook");
    require("./passport/passport-google");
    app.use(
      morgan("common", {
        skip: function (req, res) {
          if (req.url == "/_ah/health") {
            return true;
          } else {
            return false;
          }
        }
      })
    );
    app.use(cors());
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(cookieParse());
    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({ extended: true }));

    // app.use(validator);
    app.use(
      session({
        secret: "mykey",
        resave: true,
        store: new mongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    );
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    app.locals._ = _;
  }
});
