/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res, next) {

		res.view();
	},

	report: function (req, res, next) {

		var gmtPeru 	= '00:00:00-05';
		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));

		Expense.find({ createdAt: { '>': new Date(startDate+' '+gmtPeru), '<': new Date(endDate+' '+gmtPeru) } }, function (err, expense) {
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
		d.createdAt = (d.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');
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

