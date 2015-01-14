$(document).ready(OnReady);
function OnReady(){
alert = function() {};

 	$('.tableContainer').hide();

	$('#send').on('click',function(e){
		e.preventDefault();
		simplex();		
	});	
}


	function simplex(){

		$('tr td').remove();

		var total = 0.00;
		
		var data = {
    		startDate: 	$('#inicio').val(),
			endDate: 	$('#fin').val(),
    	}

    	if($(".service").val()!=='false'){
    		data.service = $(".service").val()
    	}

		$.ajax({
			beforeSend: function(){
				$('.spin').spin('show'); 		//mostrar spin antes de enviar ajax
			},
	    	url: "/salereport/reportservice/",
	    	type: "GET",
	    	data: data,
	    	success: function (resp) {
	    		console.log(resp)
	    		for (var i = 0; i < resp.length; i++) {
	    			var serviceName = resp[i].serviceName;
	    			var saleNumber 	= resp[i].id_sale;
		    		var date		= resp[i].createdAt;
		    		var quantity 	= resp[i].quantity;
		    		var pu		= resp[i].unityPrice;
		    		var pt		= resp[i].fullPrice;
		    		total += parseFloat(pt); 

		    		$('tbody:first').append("<tr><td>"+serviceName+"</td><td>"+saleNumber+"</td><td>"+date+"</td><td>"+quantity+"</td><td>S/."+pu+"</td><td>S/."+pt+"</td><td><a href='/salereport/show/"+saleNumber+"' target='_blank'>Ver</a></td></tr>");
	    		}
			   
	    		
			    $("#total").text("S/."+total.toFixed(2));
			    $('#advData').DataTable({
			    	//"scrollY":        "1000px",
			        "scrollCollapse": true,
			 		"paging":   	  false,
			    	"info":     	  false,
			    	"language": {
			    		"search": 		"Buscar",
			    		"lengthMenu": 	"Mostrar _MENU_ campos por página",
			    		"zeroRecords": 	"No se encontró resultados - intente con otros datos",
			    		"info": 		"",
			    		"infoFiltered": "",
			    	}
			    });
	    		$('.tableContainer').show();
	    		$('.spin').spin('hide'); 	//ocultar el spin

	    	},
	    	error: function (jqXHR, estado, error) {
	    		console.log(estado);
	    		console.log(error);
	    	},
	    	complete: function (jqXHR, estado) {
	    		console.log(estado);
	    	}
   	 	});
	}