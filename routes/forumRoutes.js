const db = require("../models");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/forum", getUserinfo, getPosts, renderForum);

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(data) {
      res.json(data);
    });
  });

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

  function getPosts(req, res, next) {
    db.Post.findAll({}).then(function(data) {
      //console.log(dbExamples);
      req.post = data;
      next();
    });
  }

  function renderForum(req, res) {
    //console.log(req.examples[0].text);
    res.render("forum", { ...req });
  }
};
