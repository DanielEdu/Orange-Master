var clientNoHistory 	= 2;
var successFull 		= 1;
var thereIsNotClient 	= 0;
var userId;		


$(document).ready(OnReady);
function OnReady(){
	

	$('#mensaje').hide();
	$("#mysearch").on('keyup', function() {

		$.ajax({
	    	url: "/client/findByDni/",
	    	type: "GET",
	    	data: {
	    		dni: $('#mysearch').val()
	    	},
	    	success: function (resp) {
	    		$('datalist').empty();
	    		for (var i = 0; i < resp.length; i++) {

	    			$('datalist:first').append(resp[i]);
	    			console.log(resp[i]);
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
	$("#searchBT").on('click', function(){
		$.ajax({
	    	url: "/clientdetail/findByDni/",
	    	type: "GET",
	    	data: {
	    		dni: $('#mysearch').val()
	    	},
	    	success: function (resp) {
	    		var data = resp;
	    		console.log(data);
	    		if(data.cod === thereIsNotClient){
	    			$('#msj').html(data.resp);
	    			$('#create').hide();
	    			$('#mensaje').show();
	    		}
	    		if(data.cod === clientNoHistory){
	    			$('form').attr('action','/clientdetail/create/?id_client='+data.dat.id_client)
	    			
	    			$('#msj').html(data.resp);
	    			$('#mensaje').show();
	    			$('#create').show();
	    			$('#h').html("Registrar los detalles de "+data.dat.clientName)
	    		}
	    		if(data.cod === successFull){
	    			window.location.replace(resp.dat);

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

}