$(document).ready(OnReady);
function OnReady(){


    $('#dvData').DataTable();
 	$('.tableContainer').hide();
 	$("#msj").append("indique el intervalo de tiempo para su reporte");

	$('#send').on('click',function(e){
		e.preventDefault();

		$.ajax({
	    	url: "/salereport/report/",
	    	type: "GET",
	    	data: {
	    		startDate: 	$('#inicio').val(),
				endDate: 	$('#fin').val(),
				id_service: $('#idService').val()
	    	},
	    	success: function (resp) {
	    		for (var i = 0; i < resp.length; i++) {
	    			console.log(resp[i]);
		    		var clientName 	= resp[i].clienteName;
		    		var money		= resp[i].fullPrice;
		    		var seller		= resp[i].sellerName;
		    		var date		= resp[i].createdAt;
		    		$('tbody:first').append("<tr><td>"+clientName+"</td><td>"+seller+"</td><td>"+money+"</td><td>"+date+"</td></tr>");
	    		}
	    		$('.tableContainer').show();
	    		$("#mensaje").hide();
	    	},
	    	error: function (jqXHR, estado, error) {
	    		console.log(estado);
	    		console.log(error);
	    	},
	    	complete: function (jqXHR, estado) {
	    		console.log(estado);
	    	}
   	 	});

	});
}