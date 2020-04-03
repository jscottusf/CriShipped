const request = require("request");
let axios = require("axios");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get(
    "/location/:city",
    getLocation,
    getCovidData,
    getNews,
    renderLocationPage
  );

  function getLocation(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in to view city data");
      res.redirect("/login");
    } else {
      const users = req.app.locals.users;
      const _id = ObjectID(req.session.passport.user);

      users.findOne({ _id }, (err, results) => {
        req.location = results;
        next();
      });
    }
  }

  function getCovidData(req, res, next) {
    var options = {
      method: "GET",
      url: "https://corona.lmao.ninja/all",
      headers: {}
    };
    request(options, function(error, response) {
      if (error) throw new Error(error);
      req.covidData = JSON.parse(response.body);
      next();
    });
  }

  function getNews(req, res, next) {
    const city = req.location.city;
    const state = req.location.state;
    const newsUrl =
      "https://newsapi.org/v2/everything?q=" +
      city +
      " " +
      state +
      " disaster&pageSize=5&apiKey=51ad50d7f392413b9588cea498c80fd3";
    axios.get(newsUrl).then(function(response) {
      req.newsData = response.data.articles;
      next();
    });
  }

  function renderLocationPage(req, res) {
    res.render("location", { ...req });
  }
};
