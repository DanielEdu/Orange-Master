
$(document).ready(OnReady);
  function OnReady(){
    $('#dvData').DataTable({

    	"language": {
    		"search": "Buscar",
    		"lengthMenu": "Mostrar _MENU_ campos por página",
    		"zeroRecords": "No se encontro - intente con otros datos",
    		"info": "",
    		"infoFiltered": "",
    	}
    });

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

            $("#dialogo").dialog({ // muestra la ventana  -->
	            width: 500,  // ancho de la ventana -->
	            height: 300,// altura de la ventana -->
	            show: "scale", // animación de la ventana al aparecer -->
	            hide: "scale", // animación al cerrar la ventana -->
	            resizable: "false", // fija o redimensionable si ponemos este valor a "true" -->
	            position: "center",// posicion de la ventana en la pantalla (left, top, right...) -->
	            modal: "true" // si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        	}); 
        	$('#observationBtn').on('click', function (){
        		var data = {
		    		observations: $("#observation").val(),
		            cod: 6
		    	}
		    	console.log(data);
		    	ajax(id, data);
        	});
        } 

    	ajax(id, data);			 	   
    });



function ajax (id, data){
	$.ajax({

    	url: "/client/update/"+id,
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
    return;
}

}