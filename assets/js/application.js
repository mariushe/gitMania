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
});
