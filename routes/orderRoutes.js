const db = require("../models");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/orders", function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    }
    const _id = ObjectID(req.session.passport.user);
    var id = JSON.stringify(_id);
    console.log(id);
    db.Order.findAll({
      where: { user_id: id }
    }).then(function(dbOrder) {
      res.render("orders", { dbOrder });
    });
  });

  app.post("/api/orders", function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    }
    const _id = ObjectID(req.session.passport.user);
    const order = {
      user_id: _id,
      product_name: req.body.productName,
      product_price: req.body.productPrice
    };
    db.Order.create(order).then(function(data) {
      //console.log(data);
      req.flash("success", "Item added to you order requests");
      res.redirect(req.body.originalUrl);
    });
  });

  app.put("/api/orders/:id", function(req, res) {
    db.Order.update(
      {
        order_status: req.body.order_status
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function() {
      req.flash("success", "Item added to you order requests");
      res.end();
    });
  });
};
