var postTitle = $("#postTitle");
var postBody = $("#postBody");
var $submitBtn = $("#add-post");
var postLocation = $("#category");

//fix capitalization of user city
usercity = usercity
  .toLowerCase()
  .split(" ")
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(" ");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post),
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET",
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE",
    });
  },
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id,
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var post = {
    title: postTitle.val().trim(),
    body: postBody.val().trim(),
    user: username,
    city: usercity,
  };

  if (!(post.title && post.body)) {
    alert("Post incomplete");
    return;
  }
  console.log(post);
  API.saveExample(post).then(function() {
    location.reload();
  });

  postTitle.val("");
  postBody.val("");
};

$submitBtn.on("click", handleFormSubmit);
postLocation.on("change", function() {
  var param = $(this).val();
  window.location.href = "/forum/" + param;
});
