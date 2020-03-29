const authUtils = require("../utils/auth");
const db = require("../models");
const passport = require("passport");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/", checkAuthenticated, (req, res) => {
    const users = req.app.locals.users;
    const _id = ObjectID(req.session.passport.user);
    console.log(_id);

    users.findOne({ _id }, (err, results) => {
      if (err || !results) {
        res.render("index", { messages: { error: ["User not found"] } });
      }
      res.render("index", { name: results.name });
    });
  });

  app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
  });

  app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "wrong username or password"
    }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

  app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
  });

  app.post("/register", checkNotAuthenticated, (req, res, next) => {
    //const hashedPassword = bcrypt.hash(req.body.password, 10);
    const registrationParams = req.body;
    const users = req.app.locals.users;
    const payload = {
      name: registrationParams.name,
      email: registrationParams.email,
      password: authUtils.hashPassword(registrationParams.password)
    };

    users.insertOne(payload, err => {
      if (err) {
        req.flash("error", "User account already exists");
        res.redirect("/register");
      } else {
        req.flash("success", "User account registered successfully");
        res.redirect("/login");
      }
    });
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/register");
  }

  app.get("*", function(req, res) {
    res.render("404");
  });

  app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  }
};
