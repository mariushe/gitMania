$(document).ready(function() {

$("#myTable").tablesorter(); 
	$("#submit").click(addNewResult);

	function addNewResult() {
		$("#myTable").tablesorter(); 
		var resultValue = $("#field").val();
		$("#result").append(resultValue + "<br>");
		$("#field").val("");
	}
});
