var postTitle = $("#postTitle");
var postBody = $("#postBody");
var $submitBtn = $("#add-post");
var postLocation = $("#category");

//fix capitalization of user city
usercity = usercity
  .toLowerCase()
  .split(" ")
  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
  .join(" ");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  editExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "api/posts/",
      data: JSON.stringify(post)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var post = {
    title: postTitle.val().trim(),
    body: postBody.val(),
    user: username,
    city: usercity
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
$(".dropleft").on("click", "#delete", function() {
  console.log("click");
  var idToDelete = $(this).attr("data-id");
  API.deleteExample(idToDelete).then(function() {
    window.location.href = "/forum";
  });
});

// $("#edit-button").on("click", handleEdit);
postLocation.on("change", function() {
  var param = $(this).val();
  window.location.href = "/forum/" + param;
});
