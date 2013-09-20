
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

  $(".modal").remove();

  var hash = $(this).find("td:first").text();

  $("#popup").append("<div class='modal' id='test_modal'>" +
    "<div class='modal-body'>" +
    "<a class='close' data-dismiss='modal'>&times;</a>" +
    "</div>" +
    "</div>");

  $(".close").click(function() {
      $(".modal").remove();
  });

  $.getJSON("/git-show?commit=" + hash, function(data) {
    var popup = $(".modal-body");
    var generatedContent = "<div class='well well-small'  display: inline-block>" + 
      "<table id='commitTable'>" +
      "<tr><td>commit&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + data.hash + "</td></tr><br>" +
      "<tr><td>author</td><td>" + data.author + "</td></tr><br>" +
      "<tr><td>date</td><td>" + data.date + "</td></tr><br>" +
      "<tr><td>msg</td><td>" + data.msg + "</td></tr><br>"+
      "</table></div>"; 

    for (i in data.diff) {
      generatedContent += "--file " + data.diff[i].filename + "<br>";
      generatedContent +="<pre><code>";

      for(j in data.diff[i].lines) {
        generatedContent += data.diff[i].lines[j].line + "<br>";
      }

      generatedContent +="</code></pre>";
    }

    popup.append(generatedContent);

  });
}