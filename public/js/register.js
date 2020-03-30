$("#go").on("click", function(event) {
  event.preventDefault();
  //scroll down to #breweries <div>
  $("html, body").animate(
    {
      scrollTop: $("#register").offset().top - 10
    },
    500
  );
});
