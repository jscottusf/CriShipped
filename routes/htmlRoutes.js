const authUtils = require("../utils/auth");
const db = require("../models");
const passport = require("passport");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/", checkAuthenticated, getUsername, getExamples, renderIndex);

  app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
  });

  app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
  });

  app.get("/faqs", (req, res) => {
    res.render("faq");
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

  app.post("/register", checkNotAuthenticated, (req, res, next) => {
    //const hashedPassword = bcrypt.hash(req.body.password, 10);
    const registrationParams = req.body;
    const users = req.app.locals.users;
    const payload = {
      firstName: registrationParams.firstName,
      lastName: registrationParams.lastName,
      username: registrationParams.username,
      email: registrationParams.email,
      password: authUtils.hashPassword(registrationParams.password)
    };

    users.insertOne(payload, err => {
      if (err) {
        req.flash(
          "error",
          "User account already exists with that email address or username"
        );
        res.redirect("/register");
      } else {
        req.flash("success", "User account registered successfully");
        res.redirect("/login");
      }
    });
  });

  app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/register");
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  }

  function getUsername(req, res, next) {
    const users = req.app.locals.users;
    const _id = ObjectID(req.session.passport.user);
    console.log(_id);
    users.findOne({ _id }, (err, results) => {
      req.firstName = results.firstName;
      req.lastName = results.lastName;
      req.username = results.username;
      req.city = results.city;
      req.state = results.state;
      next();
    });
  }

  function getExamples(req, res, next) {
    db.Home.findAll({}).then(function(data) {
      //console.log(dbExamples);
      req.home = data;
      next();
    });
  }

  function renderIndex(req, res) {
    //console.log(req.examples[0].text);
    res.render("index", {
      firstName: req.firstName,
      lastName: req.lastName,
      username: req.username,
      city: req.city,
      state: req.state,
      cards: req.home
    });
  }
};
