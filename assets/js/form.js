var cMsgSuccess = 1; // codigo de exito 
var roundUp = 2;	//variable de redondeo de decimales
var bUser = false;   // true si el usuario existe, false si no y se creara uno nuevo

	$('#mensaje').hide();
$(document).ready(OnReady);
function OnReady(){
	$('#example').DataTable();

	$.get("/service/findByName/", {service: $('#idService').val()}, 
		function(data){
			console.log(data.price)
			$('#sPrice').val(data.price)
		}
	);
	$("#mysearch").focus();
	$('#sCantidad').val("1");
	

	

	$("#searchBT").on('click', function(){

		var dni = $('#mysearch').val();
		$.ajax({
	    	url: "/client/findByDni/",
	    	type: "GET",
	    	data: {
	    		dni: dni,
	    	},
	    	success: function (resp) {
	    		//$(".clientInfo").prop('enable', true);
	    		var data = resp
	    		if(data.cod == cMsgSuccess){
	    			if(data.dat.state){
	    				$('input[name="firstName"]').val(data.dat.firstName);
						$('input[name="lastName"]').val(data.dat.lastName);
						$('input[name="phoneNumber"]').val(data.dat.phoneNumber);
						$('input[name="email"]').val(data.dat.email);
						$('input[name="address"]').val(data.dat.address);
						$('select[name="district"]').val(data.dat.district);

						$(".clientInfo").prop('disabled', true);
						$("#msj").append("cliente encontrado");
						$('#mensaje').show();
						bUser = true;
						$("#idService").focus();
	    			}
	    			if(!data.dat.state){
	    				alert("El cliente esta desabilitado, contacte con su administrador.")
	    				window.location.replace("/sale/new/" );
	    			}

				}
				else{
				// $("#msj").append(data.resp);
				// $('#mensaje').show();
				// 	bUser = false;
				window.location.replace("/sale/registration/"+ dni);
				}
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


	var firstName, lastName, clientDocument, fullPrice;
	var total = 0.00;
	
	$('#idService').on('change', function(){
		$.get("/service/findByName/", {service: $('#idService').val()}, 
			function(data){
				console.log(data.price)
				$('#sPrice').val(data.price)
			});
	});

	$('#add').on('click',function(e){
		e.preventDefault();
		var producto = $('#idService').val();
		var cant = $('#sCantidad').val();
		var precioUnit = parseFloat($('#sPrice').val()).toFixed(roundUp);
		var precioTotal = parseFloat(precioUnit * cant).toFixed(roundUp);
		var button = "<button class='delete btn btn-danger btn-xs'>x</button>";
		

		$('tbody:first').append("<tr><td>"+button+"</td><td class='producto'>"+producto+"</td><td class='cantidad'>"+cant+"</td><td class='precio'>"+precioUnit+"</td><td class='endPrice'>"+precioTotal+"</td></tr>");

		total = total + (precioUnit * cant);
		$('#total').val(total.toFixed(roundUp));
		$("#idService").focus();


	});

	// ------------Borrar filas de la tabla y restarle el precio al total----------------

	$('table').on('click', 'td button', function () { 
		var price = $(this).parent().siblings('.endPrice').text();
		total -= price;
		$('#total').val(total.toFixed(roundUp));
		$(this).parent().parent().remove(); 
	});

	//-----------------------------------------------------

    $('.saveSale').on('click',function(e){

    	e.preventDefault();
    	var $filas = $('.tableSale tr');
		var arr = [];
	

    	firstName = document.fo1.firstName.value;
	    lastName = document.fo1.lastName.value;
	    clientDocument = document.fo1.dniSeach.value;
	    fullPrice = document.fo2.fullPrice.value;

	    /***  For para esxtraer los valores de la tabla de detalles ***/
	   for (var i = 0; i < $filas.length; i++) {
		    var fila = $filas[i];
		    var json = {
		        serviceName: $(fila).find('.producto').text(),
		        quantity: $(fila).find('.cantidad').text(),
		        endPrice: $(fila).find('.endPrice').text(),
		        unityPrice: $(fila).find('.precio').text(),
		        id_sale: '',
	    		id_service: ''
		    };
		    arr.push(json);
		}

	    // *************************************** //
	    
	    if(bUser){
	    	var data = {
	    		firstName: firstName,
	    		lastName: lastName,
	    		clientDocument: clientDocument,
	    		fullPrice: fullPrice,
	    		details: arr
	    	};
	    }else{
	    	var data = {
	    		
	    		clientDocument: clientDocument,
	    		firstName: firstName,
	    		lastName: lastName,
	    		phoneNumber: $('input[name="phoneNumber"]').val(),
	    		email: $('input[name="email"]').val(),
	    		address: $('input[name="address"]').val(),
	    		district: $('select[name="district"]').val(),
	    		fullPrice: fullPrice,
	    		details: arr
	    	};
	    }

	    console.log(data)
	    
    	$.ajax({

	    	url: "/sale/create",
	    	type: "POST",
	    	data: data,
	    	success: function (resp) {
	    		$('#tName').append(firstName+' '+lastName);
	    		$('#tDni').append($('#mysearch').val());
	    		$('#tPrice').append($('#total').val());
	    		//$('#print').on('click', function() {
					var restorepage = document.body.innerHTML;
					var printcontent = document.getElementById('ticket').innerHTML;
					document.body.innerHTML = printcontent;
					window.print();
					$("body").innerHTML = restorepage;
				//})
	    		console.log(resp);
	    		alert("Venta registrada correctamente.")
	    		window.location.replace("/sale/new/");
	    	},
	    	error: function (jqXHR, estado, error) {
	    		console.log(estado);
	    		console.log(error);
	    	},
	    	complete: function (jqXHR, estado) {
	    		console.log(estado);
	    	}
   	 	});
    })  
}