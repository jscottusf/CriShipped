const request = require("request");
let axios = require("axios");
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get(
    "/location/:city",
    getLocation,
    getWeather,
    getForecast,
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

  // getGPS(req, res, next) {
  //   const mapBoxApi = "pk.eyJ1IjoianNjb3R0dXNmIiwiYSI6ImNrNjFpbWEydjAxbjgzam9hZTgyd3hoN3QifQ.tUiC-b5WfvxUJuYp49Vqzw";
  //   const city = req.location.city;
  //   const state = req.location.state;
  //   const url = ""
  // }

  function getWeather(req, res, next) {
    const city = req.location.city;
    const appID = "64561e1bce2987193deea2fce1a779d4";
    const weatherAPI =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&APPID=" +
      appID;
    axios.get(weatherAPI).then(function(response) {
      console.log(response.data);
      req.weather = response.data;
      next();
    });
  }

  function getForecast(req, res, next) {
    const city = req.location.city;
    const appID = "64561e1bce2987193deea2fce1a779d4";
    const weatherAPI =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&APPID=" +
      appID +
      "&cnt=7";
    axios.get(weatherAPI).then(function(response) {
      //console.log(response.data.list);
      req.forecast = response.data.list;
      next();
    });
  }

  function getCovidData(req, res, next) {
    var options = {
      method: "GET",
      url: "https://corona.lmao.ninja/all",
      headers: {},
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
      " covid&pageSize=5&apiKey=51ad50d7f392413b9588cea498c80fd3";
    axios.get(newsUrl).then(function(response) {
      req.newsData = response.data.articles;
      next();
    });
  }

  function renderLocationPage(req, res) {
    res.render("location", { ...req });
  }
};
