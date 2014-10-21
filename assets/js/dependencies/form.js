
$(document).ready(OnReady);
function OnReady(){

 
	$(document).ready(function(){
	  
    $("#go").click(function(){
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
    });
  });

}