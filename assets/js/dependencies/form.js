$(document).ready(OnReady);

function OnReady(){

	$("#mysearch").keypress(function(e){
		if(e.which == 13){
			$.get("/client/findByDni/", {dni: $(this).val()}, function(data){
				console.log(data);
				$('input[name="firstName"]').val(data.firstName);
				$('input[name="lastName"]').val(data.lastName);
				$('input[name="phoneNumber"]').val(data.phoneNumber);
				$('input[name="email"]').val(data.email);
				$('input[name="address"]').val(data.address);
			});
		}	
	});




	  
var firstName, lastName, clientDocument, fullPrice;
    $('#send').on('click',function(e){

    	e.preventDefault();

    	firstName = document.fo.firstName.value;
	    lastName = document.fo.lastName.value;
	    clientDocument = document.fo.dniSeach.value;
	    fullPrice = document.fo.fullPrice.value;

	    var $filas = $('.tableSale');
	    var arr = [];

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