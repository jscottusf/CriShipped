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
    const { name, location, suppliesNeeded, suppliesOffered } = req.body;
    const _id = ObjectID(req.session.passport.user);

    users.updateOne(
      { _id },
      { $set: { name, location, suppliesNeeded, suppliesOffered } },
      err => {
        if (err) {
          throw err;
        }
      }
    );

    res.redirect("/");
  });

  app.get("/users/:username", (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    } else {
      const users = req.app.locals.users;
      const username = req.params.username;

      users.findOne({ username }, (err, results) => {
        if (err || !results) {
          // var data = {
          //   message: req.flash("error", "User account not found")
          // };
          res.render("404");
        } else {
          res.render("profile", { ...results, username });
        }
      });
    }
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
