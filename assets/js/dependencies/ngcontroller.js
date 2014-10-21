(function (){

	var app = angular.module('orange', []);

	app.controller('controllerD', function () {
		this.detalles = [];
		this.detalle = {};
		var $filas = $('.table');
    	var arr = [];

		this.addDetalle = function () {
			this.detalles.push(this.detalle);
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
			this.detalle = {};
		}
		
	});

})();