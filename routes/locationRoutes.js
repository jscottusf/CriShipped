const request = require("request");
let axios = require("axios");
const ObjectID = require("mongodb").ObjectID;
var Handlebars = require("handlebars");

Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("nextItem", function(array, index, options) {
  return options.fn(array[index + 1]);
});

module.exports = function(app) {
  app.get(
    "/location/:city",
    getLocation,
    getGPS,
    getNWSPoint,
    getNowCast,
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

  function getGPS(req, res, next) {
    const mapBoxApi =
      "pk.eyJ1IjoianNjb3R0dXNmIiwiYSI6ImNrNjFpbWEydjAxbjgzam9hZTgyd3hoN3QifQ.tUiC-b5WfvxUJuYp49Vqzw";
    var city = req.location.city;
    var state = req.location.state;
    var mapboxUrl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(city) +
      "%20" +
      encodeURI(state) +
      ".json?access_token=" +
      mapBoxApi;
    var options = {
      method: "GET",
      url: mapboxUrl,
      headers: {}
    };
    request(options, function(error, response) {
      if (error) throw new Error(error);
      var data = JSON.parse(response.body);
      //console.log(data);
      if (data.features.length > 0) {
        req.latitude = data.features[0].center[1];
        req.longitude = data.features[0].center[0];
        console.log(data.features[0].place_name);
        console.log(req.latitude + " " + req.longitude);
        next();
        //if user enters some nonsense, default to Portland, Oregon
      } else {
        req.latitude = 45.5051;
        req.longitude = -122.675;
        req.location.city = "Portland";
        req.location.state = "Oregon";
        next();
      }
    });
  }

  function getNWSPoint(req, res, next) {
    const NWS =
      "https://api.weather.gov/points/" + req.latitude + "," + req.longitude;
    axios.get(NWS).then(function(response) {
      req.forecastAPI = response.data.properties.forecast;
      req.nowCastAPI = response.data.properties.forecastHourly;
      //console.log(req.forecastAPI);
      next();
    });
  }

  function getNowCast(req, res, next) {
    const NWSnowCast = req.nowCastAPI;
    axios.get(NWSnowCast).then(function(response) {
      req.nowCast = response.data.properties.periods[0];
      //console.log(req.nowCast);
      next();
    });
  }

  function getForecast(req, res, next) {
    const NWSforecast = req.forecastAPI;
    axios.get(NWSforecast).then(function(response) {
      req.sevenDayNWS = response.data.properties.periods;
      //console.log(req.sevenDayNWS);
      next();
    });
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
