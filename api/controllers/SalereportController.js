/**
 * SalereportController
 *
 * @description :: Server-side logic for managing salereports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */ 



module.exports = {
	'new': function (req, res, next) {
		User.find({admin: ['user', 'admin']}, function (err, users) {
			Client.find(function (err, clients) {
			
				if (err) return next(err);
				//Obtener la fecha del sitema
				var systemDate = new Date();

				var day 	= systemDate.getDate();
				var month 	= systemDate.getMonth()+1;
				var year 	= systemDate.getFullYear();

				if(day<10){
					day = '0' + day;
				}
				if(month<10){
					month = '0' + month;
				}

				var systemDateFormat = year+'-'+month+'-'+day;
				//--------------------------------------------------
				Service.find(function (err, servicios){
					if (err) return next(err);	
					res.view({
						systemDateFormat: 	systemDateFormat,
						users: 				users,
						clients:   			clients,
					});
				});
			});
		});
	},

	'services': function (req, res, next) {
		
		Service.find(function (err, services) {
			if (err) return next(err);
			//Obtener la fecha del sitema
			var systemDate = new Date();

				var day 	= systemDate.getDate();
				var month 	= systemDate.getMonth()+1;
				var year 	= systemDate.getFullYear();

				if(day<10){
					day = '0' + day;
				}
				if(month<10){
					month = '0' + month;
				}

			var systemDateFormat = year+'-'+month+'-'+day;
			//--------------------------------------------------
			Service.find(function (err, servicios){
				if (err) return next(err);	
				res.view({
					systemDateFormat: 	systemDateFormat,
					services: 			services,
				});
			});
		});				
	},

	'extorno': function (req, res, next) {

		Sale.find({
			/*createdAt:{ 
				'>=': new Date(startDate), 
				'<=': new Date(endDate)
			},*/ 
			state: { 
				'!': true 
			}
		},
		function (err, sale) {
			if (err) return next(err);
			parsingDate(sale);
			res.view({
					sale: sale,					
				});
		});
	},

	'show': function (req, res, next) {
	    Sale.findOne(req.param('id'), function (err, sale){
	   		SaleDetail.find({id_sale:req.param('id')}, function (err, details){
			    if (err) return next(err);
			    res.view({
			    	sale:sale,
			    	details:details
			    });
			});
	   	});
	},


  //*************************************************************//
 //************** Código chevere sincrono *********************//
//*************************************************************//
	/*'showservices': function (req, res, next) {
		var obj = [];
		var obj2 = [];
		async.auto({
	        services: function(callback){
	            Service.find().exec(callback);
	        },
	        result: ['services', function(callback,results){
	            
	            async.each(results.services, function(s, innercb){
	                SaleDetail.find({id_service:s.id_service}).exec(function(err, details){
	                    var total = 0.0  //almacenara el total de ganancia generado
	                    var cont = 0 		//almacenará el numero de veces que se adquirio
	                    _.each(details, function(d){
	                        total = total + parseFloat(d.fullPrice);
	                        cont += parseInt(d.quantity);
	                    });
	                    if(s.serviceFlag === 'service'){
	                    	obj.push({					//se arma el objeto para la vista
		                        name: s.serviceName,
		                        cant: cont,
		                        total: total.toFixed(2),
	                    	});
	                    }
	                    if(s.serviceFlag === 'product'){
	                    	obj2.push({					//se arma el objeto para la vista
		                        name: s.serviceName,
		                        cant: cont,
		                        total: total.toFixed(2),
	                    	});
	                    }
	                    
	                    innercb();
	                });
	            }, function(err){
	                callback(err, obj);
	            });
	        }],
	    }, 
	    function(err,result){
	        if (err) return next(err);
	        res.view({
	        	result: obj,
	        	result2: obj2,
	        });
	    });
	},*/

	reportservice: function (req, res, next){
		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));
		endDate += " 23:59:59"
		var resp = []

		SaleDetail.find({
			createdAt:{ 
				'>=': new Date(startDate), 
				'<=': new Date(endDate),
			},
			state: { 
				'!': false, 
			},
		},
		function (err, saleDetail) {
			Service.find(function (err, services) {

				if(err) console.log('Error:' + err);
				if(req.param('service')){
					_.each(saleDetail, function(sd){
						if(sd.id_service==req.param('service')){
							resp.push(sd)
						}
					});
				}

				if(!req.param('service')){	
					resp = saleDetail;
				}

				res.send(parsingDate(resp));
			});
		});
	},

	report: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		endDate += " 23:59:59";
		startDate += " 00:00:01";

		Sale.find({
			createdAt:{ 
				'>=': new Date(startDate), 
				'<=': new Date(endDate)
			}, 
			state: { 
				'!': false 
			}
		}, function (err, sale) {
			if(err) console.log('Error:' + err);

			var resp = []
			
			if(req.param('saler') || req.param('client')){
				_.each(sale, function(s){
					
					if(req.param('saler') && s.id_user==req.param('saler') && !req.param('client')){
						resp.push(s)
					}
					if(req.param('client') && s.id_client==req.param('client') && !req.param('saler')){
						resp.push(s)
					}
					if(req.param('client') && req.param('client') && s.id_client==req.param('client') && s.id_user==req.param('saler')){
						resp.push(s)
					}
				});
			}
			else if(!req.param('client') && !req.param('user')){
				
				resp = sale;
			}

			parsingDate(resp);
			res.send(resp);		
			console.log("Reporte de ventas ok");			
	    });
	},

	excel: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		endDate += " 23:59:59";
		startDate += " 00:00:01";

		Sale.find({
			createdAt:{ 
				'>=': new Date(startDate), 
				'<=': new Date(endDate)
			}, 
			state: { 
				'!': false 
			}
		}, function (err, sale) {
			if(err) console.log('Error:' + err);

			var resp = []
			
			if(req.param('saler') || req.param('client')){
				_.each(sale, function(s){
					
					if(req.param('saler') && s.id_user==req.param('saler') && !req.param('client')){
						resp.push(s)
					}
					if(req.param('client') && s.id_client==req.param('client') && !req.param('saler')){
						resp.push(s)
					}
					if(req.param('client') && req.param('client') && s.id_client==req.param('client') && s.id_user==req.param('saler')){
						resp.push(s)
					}
				});
			}
			else if(!req.param('client') && !req.param('user')){
				
				resp = sale;
			}

			parsingDate(resp);;

			var nodeExcel = require('excel-export');
		    var conf ={};

		    conf.cols = [
			    {
			    	caption:'Nro de Venta',
			    	type:'string',
			    	width:18.7109375
			    },
			    {
			    	caption:'Fecha y Hora',
			      	type:'string',
			      	width:27.7109375
			    },
			    {
			        caption:'Cliente',
			        type:'string',
			        width:27.7109375
			    },
			    {
			        caption:'Vendedor',
			        type:'string',
			        width:27.7109375
			    },
			    {
			        caption:'Monto',
			        type:'string'
			    }
		    ];
		    conf.rows = [];

		    _.each(resp, function(rp){
				conf.rows.push([rp.id_sale, rp.createdAt, rp.clienteName, rp.sellerName, rp.fullPrice])
			});

	      	var result = nodeExcel.execute(conf);
	      	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	      	res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte de Ventas( del"+startDate+" al "+endDate+" ).xlsx");
	      	
	      	res.end(result, 'binary');			
	    });
	},
};

//*************  Functions *******************

function parsingDate(sale){
	_.each(sale, function(sl){
			sl.createdAt = sl.createdAt.getFullYear()+'/'+(sl.createdAt.getMonth()+1)+'/'+sl.createdAt.getDate()+'  '+
			sl.createdAt.getHours()+':'+sl.createdAt.getMinutes()+':'+sl.createdAt.getSeconds();

		});

	return sale
}

function parsing(a){
 	var n='';
 	_.each(a, function(j){
			n += j.replace('-','/');
		});
 	return n;
 }
