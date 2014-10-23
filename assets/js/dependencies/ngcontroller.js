(function (){

	var app = angular.module('orange', []);

	app.controller('controllerD', function () {
		this.detalles = [];
		this.detalle = {};

		this.addDetalle = function () {
			this.detalles.push(this.detalle);
			this.detalle = {};
		}
	});

})();