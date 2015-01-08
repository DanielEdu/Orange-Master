

$(document).ready(OnReady);
function OnReady(){

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

 	$('.tableContainer').hide();
 	$("#msj").append("Indique el intervalo de tiempo para su reporte. Las ventas se procesan a las 12 a.m. del día seleccionado ");

 	// ----- Si se escoge un filtro el otro se borra ------
	$('.client').on('change', function(){
		$(".saler").val('false');
	});
	$('.saler').on('change', function(){
		$(".client").val('false');
	});
	// ----------------------------------------------------

	$('#send').on('click',function(e){
		e.preventDefault();
		$('tr td').remove();

		var total = 0.00;
		if($(".client").val()!=='false' && $(".saler").val()==='false'){
			var data = {
		    		startDate: 	$('#inicio').val(),
					endDate: 	$('#fin').val(),
					client: 	$(".client").val(),
		    	}
		}
		if($(".saler").val()!=='false' && $(".client").val()==='false'){
			var data = {
		    		startDate: 	$('#inicio').val(),
					endDate: 	$('#fin').val(),
					saler: 		$(".saler").val(),
		    	}
		}
		if($(".client").val()!=='false' && $(".saler").val()!=='false'){
			var data = {
		    		startDate: 	$('#inicio').val(),
					endDate: 	$('#fin').val(),
					saler: 		$(".saler").val(),
					client: 	$(".client").val(),
		    	}
		}
		if($(".client").val()==='false' && $(".saler").val()==='false'){
			var data = {
		    		startDate: 	$('#inicio').val(),
					endDate: 	$('#fin').val(),
		    	}
		}

		$.ajax({
	    	url: "/salereport/report/",
	    	type: "GET",
	    	data: data,
	    	success: function (resp) {

	    		for (var i = 0; i < resp.length; i++) {
	    			var saleNumber 	= resp[i].id_sale;
		    		var clientName 	= resp[i].clienteName;
		    		var money		= resp[i].fullPrice;
		    		var seller		= resp[i].sellerName;
		    		var date		= resp[i].createdAt;
		    		total += parseFloat(money); 

		    		$('tbody:first').append("<tr><td>"+saleNumber+"</td><td>"+clientName+"</td><td>"+seller+"</td><td>"+date+"</td><td>S/."+money+"</td><td><a href='/salereport/show/"+saleNumber+"'>Ver</a></td></tr>");
	    		}
	    		
			    $("#total").text(total.toFixed(2));
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