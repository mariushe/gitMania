$(document).ready(function() {
	
	$("#submit").click(addNewResult);

	function addNewResult() {
		var resultValue = $("#field").val();
		$("#result").append(resultValue + "<br>");
		$("#field").val("");
	}
});
