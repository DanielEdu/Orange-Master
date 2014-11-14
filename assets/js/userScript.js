$(document).ready(OnReady);
  function OnReady(){
    $('#dvData').DataTable({
    	"paging":   false,
    	"info":     false,
    	"language": {
    		"search": "Buscar",
    	}
    });
    
    // ----------------------------------------------

    $( "table" ).on("click","td .check", function (){
    	var id = $(this).attr('id');
    	var data = {
    		state: '',
            cod: 4
    	}

    	if(this.checked) { // check select status
    		data.state = true;
   		 }else{
            data.state = false;
        } 

    	$.ajax({

	    	url: "/user/update/"+id,
	    	type: "POST",
	    	data: data,
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

    	    
    });
}