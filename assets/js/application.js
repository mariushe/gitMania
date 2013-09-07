$(document).ready(function() {

$("#myTable").tablesorter(); 
	$("#submit").click(addNewResult);

	function addNewResult() {
		var resultValue = $("#field").val();
		$("#myTable").append("<tr><td>" + resultValue + "</td></tr>");
		$("#field").val("");
		$("#myTable").corner();
	}
});
