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

	report: function (req, res, next) {

		var gmtPeru 	= '00:00:00-05';
		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		Sale.find({ createdAt: { '>': new Date(startDate+' '+gmtPeru), '<': new Date(endDate+' '+gmtPeru) } }, function (err, sale) {
			if(err) console.log('Error:' + err);
			console.log(req.params.all());
			console.log('==============================')
			var resp = []
			_.each(sale, function(s){

				if(req.param('saler') && s.id_user==req.param('saler') && !req.param('client')){
					resp.push(s)
				}
				if(req.param('client') && s.id_client==req.param('client') && !req.param('user')){
					resp.push(s)
				}
 
			});
			console.log(resp)

			var saleInfo = parsingDate(resp);
			res.send(saleInfo);		
			console.log("Reporte de ventas ok");
			
	    });
	},


};


 function searchForUser (){

 }


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
