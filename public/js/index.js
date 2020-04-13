$(document).ready(function() {
  $(function() {
    $('[data-toggle="popover"]').popover();
    // .on("mouseenter", function() {
    //   var _this = this;
    //   $(this).popover("show");
    //   $(".popover").on("mouseleave", function() {
    //     $(_this).popover("hide");
    //   });
    // })
    // .on("mouseleave", function() {
    //   var _this = this;
    //   setTimeout(function() {
    //     if (!$(".popover:hover").length) {
    //       $(_this).popover("hide");
    //     }
    //   }, 300);
    // });
  });

  $("body").on("click", ".fa-times-circle", function(event) {
    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);
    var seenStatus = {
      seen: 1
    };
    $.ajax("api/comments/" + id, {
      type: "PUT",
      data: seenStatus
    }).then(function() {
      location.reload();
    });
  });

  //checkNotifications();
});

// function checkNotifications() {
//   var dataContent = $("#bell").attr("data-content");
//   if ((dataContent = " ")) {
//     dataContent.append(
//       "No notifications to display <br> Post on the <a href='/forum'>forum</a>?"
//     );
//   }
// }
