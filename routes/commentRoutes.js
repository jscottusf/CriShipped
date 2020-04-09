const db = require("../models");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  //get the forum loaded
  app.get("/forum/post/:id", getUserinfo, getPost, renderPost);

  // Add comment
  app.post("/forum/post/api/comments", function(req, res) {
    console.log(req.body);
    db.Comment.create(req.body).then(function(data) {
      console.log(data);
      res.json(data);
    });
  });

  //get the current logged in user data from Mongo
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

  //get the post which is being edited
  function getPost(req, res, next) {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Comment],
    }).then(function(dbPost) {
      req.post = dbPost;
      next();
    });
  }

  //render all to forum.handlebars
  function renderPost(req, res) {
    res.render("post", { ...req });
  }
};
