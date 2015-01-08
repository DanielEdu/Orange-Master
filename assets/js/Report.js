var total = 0.00;

$(document).ready(OnReady);
function OnReady(){
	$('#dvData').DataTable({
		"paging":   false,
    	"info":     false,
    	"language": {
    		"search": "Buscar",
    		"lengthMenu": "Mostrar _MENU_ campos por página",
    		"zeroRecords": "No se encontro - intente con otros datos",
    		"info": "",
    		"infoFiltered": "",
    	}
    });

 	$('.tableContainer').hide();

	$('#send').on('click',function(e){
		e.preventDefault();
		$('tr td').remove();
		var startDate = $('#inicio').val();
		var endDate = $('#fin').val();	
		var total = 0.00; 

		$.ajax({
	    	url: "/report/report/",
	    	type: "GET",
	    	data: {
	    		startDate: $('#inicio').val(),
				endDate: $('#fin').val()
	    	},
	    	success: function (resp) {
	    		for (var i = 0; i < resp.length; i++) {
		    		var firstName 	 = resp[i].firstName;
		    		var lastName 	 = resp[i].lastName;
		    		var money		 = resp[i].moneyOutput;
		    		var observations = resp[i].observations;
		    		var date		 = resp[i].createdAt;
	    			total += parseFloat(money);
		    		
		    		$('tbody:first').append("<tr><td>"+date+"</td><td>"+firstName+"</td><td>"+lastName+"</td><td>"+observations+"</td><td>S/."+money+"</td></tr>");
	    		}
	    		
	    		$("#total").text(total.toFixed(2));
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