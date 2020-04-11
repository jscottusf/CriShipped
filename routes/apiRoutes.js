var db = require("../models");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  // Get all Homes
  app.get("/api/home", function(req, res) {
    db.Home.findAll({}).then(function(dbHomes) {
      res.json(dbHomes);
    });
  });

  // Create a new Home
  app.post("/api/home", function(req, res) {
    db.Home.create(req.body).then(function(dbHome) {
      res.json(dbHome);
    });
  });

  //update post as seen or unseen
  app.put("/api/comments/:id", function(req, res) {
    db.Comment.update(
      {
        seen: req.body.seen
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function() {
      res.end();
    });
  });

  // Delete an Home by id
  app.delete("/api/home/:id", function(req, res) {
    db.Home.destroy({ where: { id: req.params.id } }).then(function(dbHome) {
      res.json(dbHome);
    });
  });
};

//saveing this for how to findALL within MongoDB
// app.get("/api/users", function(req, res) {
//   const users = req.app.locals.users;
//   users
//     .find()
//     .limit(0)
//     .toArray((err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.json(results);
//     });
// });
