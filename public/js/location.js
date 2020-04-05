const mapBoxApi =
  "pk.eyJ1IjoianNjb3R0dXNmIiwiYSI6ImNrNjFpbWEydjAxbjgzam9hZTgyd3hoN3QifQ.tUiC-b5WfvxUJuYp49Vqzw";

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

mapBox(long, lat);
