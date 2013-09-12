$(document).ready(function() {

	$("#myTable").tablesorter(); 
		$("#add").click(submitResult);

		function submitResult() {
			var resultValue = $("#field").val();

			if (resultValue === "") {
				return;
			}

			$("#myTable").append("<tr><td>" + resultValue + "</td></tr>");
			$("#field").val("");
			$("#myTable").corner();
		}

		$("#submit").click(addNewRow);

		function addNewRow() {
			$("#notification").append("<div class='alert alert-success'><b>Well done!</b> You successfully pushed submit.</div>");
		}	
});
