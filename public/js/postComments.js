var commentBody = $("#commentBody");
var $submitBtn = $("#add-comment");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "api/comments",
      data: JSON.stringify(post),
    });
  },
  editExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "PUT",
      url: "api/comments/",
      data: JSON.stringify(post),
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/comments",
      type: "GET",
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/comments/" + id,
      type: "DELETE",
    });
  },
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var comment = {
    body: commentBody.val().trim(),
    user: username,
    PostId: postId,
  };

  if (!comment.body) {
    alert("Post incomplete");
    return;
  }
  console.log(comment);
  API.saveExample(comment).then(function() {
    location.reload();
  });

  commentBody.val("");
};

console.log("hello, world");
$submitBtn.on("click", handleFormSubmit);
