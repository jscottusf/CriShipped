$(".request").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  var orderStatus = {
    order_status: 1
  };
  $.ajax("api/orders/" + id, {
    type: "PUT",
    data: orderStatus
  }).then(function() {
    location.reload();
  });
});
