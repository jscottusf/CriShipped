const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const authUtils = require("../utils/auth");
const MongoClient = require("mongodb").MongoClient;
const Strategy = require("passport-local").Strategy;

module.exports = function(app) {
  app.use(flash());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride("_method"));

  //
  //'mongodb://localhost'
  MongoClient.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        throw err;
      }

      const db = client.db("crishipped-users");
      const users = db.collection("users");
      app.locals.users = users;
    }
  );

  passport.use(
    new Strategy((email, password, done) => {
      app.locals.users.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != authUtils.hashPassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });
};
