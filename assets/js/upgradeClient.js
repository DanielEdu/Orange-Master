$(document).ready(OnReady);
function OnReady(){
	var param = unescape(window.location.href);
	console.log(param+"XD")

$("#regDetails").on('click', function (){
	console.log("auch")
		
		$.ajax({
	    	url: "/clientdetail/create/",
	    	type: "POST",
	    	data: {
	    		id_client: 		userId,
	    		height: 		$('#height').val(),
	    		weight: 		$('#weight').val(),
	    		workout: 		$('#workout').val(),
	    		diet: 			$('#diet').val(),
	    		observations: 	$('#observations').val()
	    	},
	    	success: function (resp) {
	    		window.location.replace(resp);
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