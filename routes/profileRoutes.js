const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/myaccount", (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    }
    const users = req.app.locals.users;
    const _id = ObjectID(req.session.passport.user);

    users.findOne({ _id }, (err, results) => {
      if (err) {
        throw err;
      }
      res.render("account", { ...results });
    });
  });

  app.post("/myaccount", (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    }

    const users = req.app.locals.users;
    const {
      username,
      firstName,
      lastName,
      city,
      state,
      suppliesNeeded,
      suppliesOffered
    } = req.body;
    const _id = ObjectID(req.session.passport.user);

    users.updateOne(
      { _id },
      {
        $set: {
          username,
          firstName,
          lastName,
          city,
          state,
          suppliesNeeded,
          suppliesOffered
        }
      },
      err => {
        if (err) {
          req.flash("error", "User account already exists with that username");
          res.redirect("/myaccount");
        } else {
          req.flash("success", "User changes made successfully");
          res.redirect("/myaccount");
        }
      }
    );

    //res.redirect("/");
  });

  app.get("/users/:username", (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in to view user profiles");
      res.redirect("/login");
    } else {
      const users = req.app.locals.users;
      const username = req.params.username;

      users.findOne({ username }, (err, results) => {
        if (err || !results) {
          // var data = {
          //   message: req.flash("error", "User account not found")
          // };
          req.flash("error", "Error 404 page not found");
          res.render("404");
        } else {
          res.render("profile", { ...results, username });
        }
      });
    }
  });

  app.get("*", function(req, res) {
    req.flash("error", "Error 404 page not found");
    res.render("404");
  });
};
