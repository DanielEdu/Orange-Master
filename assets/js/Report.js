$(document).ready(OnReady);
function OnReady(){


    $('#dvData').DataTable();
 	$('.tableContainer').hide();

	$('#send').on('click',function(e){
		e.preventDefault();
		var startDate = $('#inicio').val();
		var endDate = $('#fin').val();	

		$.ajax({
	    	url: "/report/report/",
	    	type: "GET",
	    	data: {
	    		startDate: $('#inicio').val(),
				endDate: $('#fin').val()
	    	},
	    	success: function (resp) {
	    		for (var i = 0; i < resp.length; i++) {
	    			console.log(resp[i]);
		    		var firstName 	= resp[i].firstName;
		    		var lastName 	= resp[i].lastName;
		    		var money		= resp[i].moneyOutput;
		    		var date		= resp[i].createdAt;
		    		$('tbody:first').append("<tr><td>"+firstName+"</td><td>"+lastName+"</td><td>"+money+"</td><td>"+date+"</td></tr>");
	    		}
	    		$('.tableContainer').show();
	    		$("#mensaje").hide();

	    		$('#excel').attr('download', startDate+" al "+endDate+'.xls');
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