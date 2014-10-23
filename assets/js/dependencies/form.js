$(document).ready(OnReady);

function OnReady(){

	$("#mysearch").keypress(function(e){
		if(e.which == 13){
			$.get("/client/findByDni/", {dni: $(this).val()}, function(data){
				console.log(data)
			});
		}	
	});



	  
var firstName, lastName;
    $('#send').on('click',function(e){

    	e.preventDefault();

    	firstName = document.fo.firstName.value;
	    lastName = document.fo.lastName.value;
	    var $filas = $('.table');
	    var arr = [];

	    for (var i = 0; i < $filas.length; i++) {
	    	var fila = $filas[i];
	    	var json = {
	    		producto: $(fila).find('.producto').text(),
	    		cantidad: $(fila).find('.cantidad').text(),
	    		precio: $(fila).find('.precio').text()
	    	};
	    	arr.push(json);
	    }

	    console.log(arr);

    	$.ajax({

	    	url: "/sale/create",
	    	type: "POST",
	    	data: {
	    		firstName:firstName,
	    		lastName:lastName,
	    		detalle:arr
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