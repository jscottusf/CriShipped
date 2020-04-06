const db = require("../models");
const ObjectID = require("mongodb").ObjectID;
const startCase = require("lodash.startcase");

module.exports = function(app) {
  app.get("/forum", getUserinfo, getPosts, getCities, renderForum);

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/forum/:city", getUserinfo, getCityPosts, getCities, renderForum);

  // Create a new Home
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  function getUserinfo(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in to view forum");
      res.redirect("/login");
    } else {
      const users = req.app.locals.users;
      const _id = ObjectID(req.session.passport.user);

      users.findOne({ _id }, (err, results) => {
        req.userdata = results;
        next();
      });
    }
  }

  function getCityPosts(req, res, next) {
    var city = req.params.city;
    db.Post.findAll({
      where: { city: city },
      order: [["id", "DESC"]],
    }).then(function(data) {
      req.post = data;
      next();
    });
  }

  function getPosts(req, res, next) {
    db.Post.findAll({
      order: [["id", "DESC"]],
    }).then(function(data) {
      req.post = data;
      next();
    });
  }

  function getCities(req, res, next) {
    var allCities = req.post;
    var cities = [];
    for (var i = 0; i < allCities.length; i++) {
      var city = startCase(allCities[i].city);
      if (cities.indexOf(city) === -1) {
        cities.push(city);
      }
    }
    req.cityList = cities;
    next();
  }

  function renderForum(req, res) {
    res.render("forum", { ...req });
  }
};
