/**
 * SalereportController
 *
 * @description :: Server-side logic for managing salereports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res, next) {
		Service.find(function (err, servicios){
			if (err) return next(err);
			res.view({
				servicios: servicios
			});
		});
	},

	report: function (req, res, next) {

		var gmtPeru 	= '00:00:00-05';
		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		Sale.find({ createdAt: { '>': new Date(startDate+' '+gmtPeru), '<': new Date(endDate+' '+gmtPeru) } }, function (err, sale) {
			if(err) console.log('Error:' + err);

			else {
				//SaleDetail.find({id_service})
				var saleInfo = parsingDate(sale);
				res.send(saleInfo);		
				console.log(saleInfo)
			}
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
