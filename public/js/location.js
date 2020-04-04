const mapBoxApi =
  "pk.eyJ1IjoianNjb3R0dXNmIiwiYSI6ImNrNjFpbWEydjAxbjgzam9hZTgyd3hoN3QifQ.tUiC-b5WfvxUJuYp49Vqzw";
const noaaToken = "uqzbJznHwwPCxIdPrFqxKatkYEFPlzZn";

function getLocation(city, state) {
  var locationSearch =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(city) +
    "%20" +
    encodeURI(state) +
    ".json?access_token=" +
    mapBoxApi;
  console.log(locationSearch);
  $.ajax({
    url: locationSearch,
    method: "GET",
  }).then(function(response) {
    latitude = response.features[0].center[1];
    longitude = response.features[0].center[0];
    mapBox(longitude, latitude);
  });
}

function mapBox(long, lat) {
  mapboxgl.accessToken = mapBoxApi;
  //display map according to location
  console.log(long + " " + lat);
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [long, lat],
    zoom: 9,
  });
  //display map marker
  new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
  //allows for full screen map
  map.addControl(new mapboxgl.FullscreenControl());
  //allows to zoom in and zoom out map
  map.addControl(new mapboxgl.NavigationControl());
  map.scrollZoom.disable();
  //initial map is blurry, so calling resize adjusts blur
  map.on("load", function() {
    map.resize();
  });
}

function getTweets() {
  $.ajax({
    method: "GET",
    url:
      "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Arkansasgov",
    headers: {
      Authorization:
        "Bearer 5954192-Lr0ma2vvgF34aPWMmAibWlam2YxVTuWb2CPqY7MVTr",
    },
  }).then(function(response) {
    if (error) throw error;
    console.log(response.body);
  });
}

function getNOAA(long, lat) {
  $.ajax({
    url: "https://api.weather.gov/points/" + long + "," + lat,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });
}

getLocation(city, state);
//getNOAA();
