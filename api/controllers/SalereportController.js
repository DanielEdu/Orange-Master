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
				var day 	= sails.config.myconf.systemDate.day;
				var month 	= sails.config.myconf.systemDate.month;
				var year 	= sails.config.myconf.systemDate.year;

				var systemDateFormat = year+'-'+month+'-'+day;
				//--------------------------------------------------
				Service.find(function (err, servicios){
					if (err) return next(err);	
					res.view({
						systemDateFormat: 		systemDateFormat,
						users: 					users,
						clients:   				clients,
					});
				});
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
 

	'showservices': function (req, res, next) {
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
	},
	

	report: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		endDate += " 23:59:59"

		Sale.find({createdAt:{ '>=': new Date(startDate), '<=': new Date(endDate)}}, function (err, sale) {
			if(err) console.log('Error:' + err);

			var resp = []

			if(req.param('saler') || req.param('client')){
				_.each(sale, function(s){
					console.log("entro en for each")
					if(req.param('saler') && s.id_user==req.param('saler') && !req.param('client')){
						resp.push(s)
					}
					if(req.param('client') && s.id_client==req.param('client') && !req.param('user')){
						resp.push(s)
					}
				});
			}
			else if(!req.param('client') && !req.param('user')){
				console.log("no entro")
				resp = sale;
			}

			//var saleInfo = parsingDate(resp);
			res.send(resp);		
			console.log("Reporte de ventas ok");
			
	    });
	},

};


function parsingDate(sale){
	_.each(sale, function(sl){
			sl.createdAt = (sl.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');

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
