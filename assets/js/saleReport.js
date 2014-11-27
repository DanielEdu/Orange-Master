var total = 0.00;

$(document).ready(OnReady);
function OnReady(){

 	$('.tableContainer').hide();
 	$("#msj").append("Indique el intervalo de tiempo para su reporte");

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
	    			var saleNumber 	= resp[i].id_sale;
		    		var clientName 	= resp[i].clienteName;
		    		var money		= resp[i].fullPrice;
		    		var seller		= resp[i].sellerName;
		    		var date		= resp[i].createdAt;
		    		total += parseFloat(money);

		    		$('tbody:first').append("<tr><td>"+saleNumber+"</td><td>"+clientName+"</td><td>"+seller+"</td><td>"+date+"</td><td>S/."+money+"</td><td><a href='/salereport/show/"+saleNumber+"'>Ver</a></td></tr>");
	    		}
	    		$('#advData').DataTable({
			    	//"scrollY":        "300px",
			        "scrollCollapse": true,
			 		"paging":   	  false,
			    	"info":     	  false,
			    	"language": {
			    		"search": 		"Buscar",
			    		"lengthMenu": 	"Mostrar _MENU_ campos por página",
			    		"zeroRecords": 	"No se encontro - intente con otros datos",
			    		"info": 		"",
			    		"infoFiltered": "",
			    	}
			    });
			    $("#total").append(total.toFixed(2));
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