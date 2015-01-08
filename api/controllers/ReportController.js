/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res, next) {

		var day 	= sails.config.myconf.systemDate.day;
		var month 	= sails.config.myconf.systemDate.month;
		var year 	= sails.config.myconf.systemDate.year;

		var systemDateFormat = year+'-'+month+'-'+day;
		
		res.view({
			systemDateFormat:systemDateFormat
		});
	},

	report: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));
		endDate += " 23:59:59"

		Expense.find({createdAt: {'>=': new Date(startDate), '<=': new Date(endDate)}}, function (err, expense) {
			if(err) console.log('Error:' + err);

			else {
				var expenseInfo = parsingDate(expense);
				res.send(expenseInfo);	
			}
	    });
	},

};

function parsingDate(data){

	_.each(data, function(d){
		d.createdAt = (d.createdAt).toISOString().replace(/T/, ' hora:').replace(/\..+/, '');
	});

	return data
}


function parsing(a){
 	var n='';
 	_.each(a, function(j){
			n += j.replace('-','/');
		});
 	return n;
 }

