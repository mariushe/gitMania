
$(document).ready(function() {
 
  $.getJSON("/git-data", function(data) {
    var commits = [];

    $.each(data, function(index, value) {
      commits.push("<tr id='commit-" + index +"'><td>" + value.hash + "</td><td>" + value.msg + "</td></tr>");
    });
    
    $("#myTable").append(commits.join(''));

    $("#myTable").find("tr").click(commitClicked);

    $("#changeRepository").click(changeRepo);

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
    var generatedContent = "<div class=''  display: inline-block>" +
     "<table id='commitTable'>" +
      "<tr><td><span style='color: #9A9A9A'>commit</span>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + data.hash + "</td></tr>" +
      "<tr><td><span style='color: #9A9A9A'>author</span></td><td>" + data.author + "</td></tr>" +
      "<tr><td><span style='color: #9A9A9A'>date</span></td><td>" + data.date + "</td></tr>" +
      "<tr><td><span style='color: #9A9A9A'>msg</span></td><td>" + data.msg + "</td></tr>"+
     "</table></div>"; 

    for (i in data.diff) {
      generatedContent += "<br><h5>" + data.diff[i].filename + "</h5>";
      generatedContent +="<pre><code>";

      for(j in data.diff[i].lines) {
        if (data.diff[i].lines[j].line.substring(0,1) == "-") {
          generatedContent += "<span style='color: #ff0000'>" + data.diff[i].lines[j].line + "</span><br>";  
        } else if (data.diff[i].lines[j].line.substring(0,1) == "+") {
          generatedContent += "<span style='color: #00BF00'>" + data.diff[i].lines[j].line + "</span><br>";  
        } else {
          generatedContent += data.diff[i].lines[j].line + "<br>";  
        }
        
      }

      generatedContent +="</code></pre>";
    }

    popup.append(generatedContent);

  });
}

function changeRepo() {

  $("#myTable").children().remove();

  var path = $("#field").val();

  $.getJSON("/git-data?repository=" + path, function(data) {
    var commits = [];

    $.each(data, function(index, value) {
      commits.push("<tr id='commit-" + index +"'><td>" + value.hash + "</td><td>" + value.msg + "</td></tr>");
    });
    
    $("#myTable").append(commits.join(''));

    $("#myTable").find("tr").click(commitClicked);

  });

}