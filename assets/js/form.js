var cMsgSuccess = 1;

$(document).ready(OnReady);
function OnReady(){
	
	$('#example').DataTable();

	$.get("/service/findByName/", {service: $('#idService').val()}, 
			function(data){
				console.log(data.price)
				$('#sPrice').val(data.price)
				
			});

	$('#sCantidad').val("1");
	$('#mensaje').hide();


	$("#searchBT").on('click', function(){

			$.get("/client/findByDni/", {dni: $('#mysearch').val()},
			function(data){

			if(data.cod== cMsgSuccess){
				$('input[name="firstName"]').val(data.dat.firstName);
				$('input[name="lastName"]').val(data.dat.lastName);
				$('input[name="phoneNumber"]').val(data.dat.phoneNumber);
				$('input[name="email"]').val(data.dat.email);
				$('input[name="address"]').val(data.dat.address);
				$('select[name="district"]').val(data.dat.district);

				$(".clientInfo").prop('disabled', true);
				$("#msj").append("cliente encontrado");
				$('#mensaje').show(1000).delay( 3000 ).hide(1000);

			}else{
				$("#msj").append(data.resp);
				$('#mensaje').show(1000).delay( 3000 ).hide(1000);
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

	$('#add').on('click',function(){

		var producto = $('#idService').val();
		var cant = $('#sCantidad').val();
		var precioUnit = parseFloat($('#sPrice').val()).toFixed(2);
		var precioTotal = parseFloat(precioUnit * cant).toFixed(2);

		
		$('tbody:first').append("<tr><td>x</td><td class='producto'>"+producto+"</td><td class='cantidad'>"+cant+"</td><td class='precio'>"+precioUnit+"</td><td>"+precioTotal+"</td></tr>");


		total = total + (precioUnit * cant);
		$('#total').val(total.toFixed(2));


		

	})

    $('#send').on('click',function(e){

    	e.preventDefault();
    	var $filas = $('.tableSale');
		var arr = [];

    	firstName = document.fo1.firstName.value;
	    lastName = document.fo1.lastName.value;
	    clientDocument = document.fo1.dniSeach.value;
	    fullPrice = document.fo2.fullPrice.value;

	    /***  For para esxtraer los alores de la tabla de detalles ***/
	    for (var i = 0; i < $filas.length; i++) {
	    	var fila = $filas[i];
	    	var json = {
	    		serviceName: $(fila).find('.producto').text(),
	    		quantity: $(fila).find('.cantidad').text(),
	    		fullPrice: $(fila).find('.precio').text(),
	    		id_sale: '',
	    		id_service: ''
	    	};
	    	arr.push(json);
	    }
	    // *************************************** //

	    console.log(arr);

    	$.ajax({

	    	url: "/sale/create",
	    	type: "POST",
	    	data: {
	    		firstName: firstName,
	    		lastName: lastName,
	    		clientDocument: clientDocument,
	    		fullPrice: fullPrice,
	    		details: arr
	    	},
	    	success: function (resp) {
	    		console.log(resp);
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