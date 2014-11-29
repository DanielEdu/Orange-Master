
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
        var observations;


    	if(this.checked) { // check select status
    		data.state = true;

   		 }else{
            data.state = false;
            
            $.ajax({
                url: "/client/findById/",
                type: "GET",
                data: {
                    id: id
                },
                success: function (resp) {
                    console.log(resp)
                    observations = resp.observations
                    
                },
                error: function (jqXHR, estado, error) {
                    console.log(estado);
                    console.log(error);
                },
                complete: function (jqXHR, estado) {
                    console.log(estado);
                }
            });

            $("#dialogo").dialog({ // muestra la ventana  -->
	            width: 510,  // ancho de la ventana -->
	            height: 310,// altura de la ventana -->
	            show: "scale", // animación de la ventana al aparecer -->
	            hide: "scale", // animación al cerrar la ventana -->
	            resizable: "false", // fija o redimensionable si ponemos este valor a "true" -->
	            position: "center",// posicion de la ventana en la pantalla (left, top, right...) -->
	            modal: "true", // si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        	    buttons: {
                       OK: function() {
                            var data = {
                                observations: $("#observation").val(),
                                cod: 6
                            }
                            
                            ajax(id, data);
                            $(this).dialog("close");
                        }
                    },
            }); 
            $("#observation").val(observations);
        	/*$('#observationBtn').on('click', function (){
        		var data = {
		    		observations: $("#observation").val(),
		            cod: 6
		    	}
                
		    	ajax(id, data);
        	});*/
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