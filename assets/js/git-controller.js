
$(document).ready(function() {
 
  $.getJSON("/git-data", function(data) {
    var commits = [];

    $.each(data, function(index, value) {
      commits.push("<tr id='commit-" + index +"'><td>" + value.hash + "</td><td>" + value.msg + "</td></tr>");
    });
    
    $("#myTable").append(commits.join(''));

    $("#myTable").find("tr").click(commitClicked);

  });
});

function commitClicked() {

  var hash = $(this).find("td:first").text();

  $("#popup").append("<div class='modal' id='test_modal'>" +
    "<div class='modal-body'>" +
    "<a class='close' data-dismiss='modal'>&times;</a>" +
    "</div>" +
    "</div>");

  $(".close").click(function() {
      $(".modal").remove();
  });

  $.getJSON("/git-show", function(data) {
    $(".modal-body").append("<p>" + data.hash + "</p>");
  });
}