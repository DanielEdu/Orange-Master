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
		Service.find({where: { serviceFlag: 'service' }, sort: 'serviceName'}, function (err, services) {
		    if (err) return next(err);
	      	res.view({	 
	      		services: services
	     	});
		});
	},
	

	report: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

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
