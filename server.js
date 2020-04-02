require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var paginate = require('express-paginate');
// var routerRegister = require('./routes/router.register');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require('fs');
// var cookieParser = require('cookie-parser');

var handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');
 
layouts.register(handlebars);


var db = require("./models");


var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
//Pagination Middleware
app.use(paginate.middleware(9, 20));

// var handlebars = require('express-handlebars');  
// var viewsPath = path.join(__dirname, 'views');  
// app.set('views', viewsPath);  
// var hbs = handlebars.create({  
//   defaultLayout: 'main', 
//   catalogue: viewsPath + '/cataloguedm', 
//   layoutsDir: viewsPath + '/layouts',  
//   partialsDir: viewsPath + '/cataloguedm/partials'
// });  
// app.engine('handlebars', hbs.engine);  
// app.set('view engine', 'handlebars');  

// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set("view engine", "handlebars");

// var viewsPath = path.join(__dirname, 'cataloguedm', 'views');
// app.set('views', viewsPath);
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main',
//     layoutsDir: viewsPath + '/layouts',
//     catalogue: 'cataloguedm',
//     catalogueDir: viewsPath + '/cataloguedm',
//     partialsDir: '/cataloguedm/partials',
//     partials: 'partials'
// }));
// app.set('view engine', 'handlebars');

// var express = require('express');
// var exphbs  = require('express-handlebars');

// var app = express();
var hbs = exphbs.create({ 
  /* config */
  defaultLayout: "main", 
});

// Register helpers 
handlebars.registerHelper(layouts(handlebars));

// Register partials 
handlebars.registerPartial('index', fs.readFileSync('views/index.handlebars', 'utf8'));

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// const hbs = exphbs.create({
//   extname      :'handlebars',
//   layoutsDir   : 'views/layouts/',
//   defaultLayout: 'main',
//   catalogue  : [
//     'views/cataloguedm/',
//     'views/cataloguedm/partials'
//   ]
// });

// app.engine('hbs', hbs.engine);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'handlebars');


// 'views',
//     'views/cataloguedm',
//     'views/cataloguedm/partials',
//     'views/cartdm',
//     'views/cartdm/partials',
//     'views/checkoutdm'

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
require('./routes/router.register')(app);




// Register the Routers
// routerRegister(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


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

module.exports = app;


// 'use strict';
// require("dotenv").config();
// var exphbs = require("express-handlebars");
// var debug = require('debug');
// var express = require('express');
// var path = require('path');
// // var favicon = require('serve-favicon');
// // var logger = require('morgan');
// // var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var paginate = require('express-paginate');
// var routerRegister = require('./routes/router.register');
// var session = require('express-session');
// // var contextProcessor = require('./middlewares/context.processor.js');


// var app = express();

// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// // // View Engine SetUp
// // nunjucks.configure(
// //   ['views',
// //     'views/cataloguedm',
// //     'views/cataloguedm/partials',
// //     'views/cartdm',
// //     'views/cartdm/partials',
// //     'views/checkoutdm'
// //   ],
// //   {
// //     autoescape: true,
// //     express: app
// //   });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'handlebars');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// // app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //Pagination Middleware
// app.use(paginate.middleware(9, 20));

// app.use(session({
//   secret: '95371e2f-a487-4e22-a9e2-8b6356b85453',
//   proxy: true,
//   resave: true,
//   saveUninitialized: true
// }));

// //Make the cart parameters available to the templates
// // app.use(contextProcessor.localContext);


// // Register the Routers
// routerRegister(app);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function () {
//     debug('Express server listening on port ' + server.address().port);
// });

// module.exports = app;
