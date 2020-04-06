if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;
const paginate = require("express-paginate");
//const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
//const fs = require("fs");
var cons = require('consolidate'),
  nunjucks = require('nunjucks');
const handlebars = require("handlebars"),
  layouts = require("handlebars-layouts");

// assign the nunjucks engine to .html files
app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// // View Engine SetUp
// cons.requires.nunjucks = nunjucks.configure(
//   ['views',
//     'views/cataloguedm',
//     'views/partials',
//   ],
//   {
//     autoescape: true,
//     express: app
//   });
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

layouts.register(handlebars);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//Pagination Middleware
app.use(paginate.middleware(9, 20));


// Routes
require("./config/mongo")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/locationRoutes")(app);
require("./routes/catalogueRoutes")(app);
require("./routes/forumRoutes")(app);
require("./routes/profileRoutes")(app);

var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
//variable syncOptions inside of sync eventually
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
