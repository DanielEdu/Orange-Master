

$(document).ready(OnReady);
function OnReady(){
alert = function() {};

 	$('.tableContainer').hide();
 	$("#msj").append("Indique el intervalo de tiempo para su reporte.");

 	// ----- Si se escoge un filtro el otro se borra ------
	$('.service').on('change', function(){
		$(".saler").val('false');
		$(".client").val('false');

	});

	// ---------- Reporte en Excel --------
	$('#sendExcel').on('click',function(e){
 		e.preventDefault();
		
		var startDate = $('#inicio').val();  //fecha de inicio (desde)
		var endDate = $('#fin').val();		//fecha de fin (hasta)
		var saler =	$(".saler").val();
		var client = $(".client").val();

		if($(".client").val()!=='false' && $(".saler").val()==='false'){
			window.location.href = 
			'/salereport/excel/?startDate='+startDate+
			'&endDate='+endDate+
			'&client='+client;			
		}
		if($(".saler").val()!=='false' && $(".client").val()==='false'){
			window.location.href = 
			'/salereport/excel/?startDate='+startDate+
			'&endDate='+endDate+
			'&saler='+saler;
		}
		if($(".client").val()!=='false' && $(".saler").val()!=='false'){
			window.location.href = 
			'/salereport/excel/?startDate='+startDate+
			'&endDate='+endDate+
			'&saler='+saler+
			'&client='+client;			
		}
		if($(".client").val()==='false' && $(".saler").val()==='false'){
			window.location.href = 
			'/salereport/excel/?startDate='+startDate+
			'&endDate='+endDate;
		}		
 	});

	//----- extorno ------
	$('table').on('click', 'td button', function () { 
		var id = $(this).attr('id');
		var obs = '';
		$("#dialogo").dialog({ // muestra la ventana  -->
            width: 510,  // ancho de la ventana -->
            height: 310,// altura de la ventana -->
            show: "scale", // animación de la ventana al aparecer -->
            hide: "scale", // animación al cerrar la ventana -->
            resizable: "false", // fija o redimensionable si ponemos este valor a "true" -->
            position: "center",// posición de la ventana en la pantalla (left, top, right...) -->
            modal: "true", // si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
    	    buttons: {
    	    	OK: function(){
    	    		obs = $("#observation").val();
    	    		extorn(id, obs);  //llamar ajax de extorno
    	    				// re-consultar nuevo reporte
					$(this).dialog("close");  //cerrar el dialogo 
    	    	},
    	    },
        });			
	});

	//------Consultar reporte--------------------
	$('#send').on('click',function(e){
		e.preventDefault();

		simplex();		
	});	
}

/**************                  ***************/
	function extorn(id, obs){
		$.ajax({
            url: "/sale/update/",
            type: "POST",
            data: {
                id: 	id,
                state: 	false,
                observations: obs,
            },
            success: function (resp) {
                console.log(resp)
                simplex();
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

	function simplex(){

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
			beforeSend: function(){
				$('#excel').attr('download',"Ventas del "+data.startDate+" al "+data.endDate+'.xls');
				$('.spin').spin('show'); 		//mostrar spin antes de enviar ajax

			},
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
	    			var button = "<button id='"+saleNumber+"' class='delete btn btn-danger btn-xs'>x</button>";
		    		total += parseFloat(money); 

		    		$('tbody:first').append("<tr><td>"+button+"</td><td> 000-"+saleNumber+"</td><td>"+date+"</td><td>"+clientName+"</td><td>"+seller+"</td><td class='endPrice'>"+money+"</td><td><a href='/salereport/show/"+saleNumber+"' target='_blank'>Ver</a></td></tr>");
	    		}
			    $('.spin').spin('hide'); 	//ocultar el spin
	    		
			    $("#total").text("S/."+total.toFixed(2));
			    $('#advData').DataTable({
			    	//"scrollY":        "300px",
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
	}