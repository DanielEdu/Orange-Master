/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res, next) {
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
		res.view({
			systemDateFormat:systemDateFormat
		});
	},

	report: function (req, res, next) {

		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));
		endDate += " 23:59:59"
		console.log(startDate)
		Expense.find({createdAt: {'>=': new Date(startDate), '<=': new Date(endDate)}}, function (err, expense) {
			if(err) console.log('Error:' + err);

			else {
				parsingDate(expense);
				res.send(expense);	
			}
	    });
	},

	excel: function (req, res, next) {

		console.log(req.params.all())
		var startDate 	= parsing(req.param('startDate'));
		var endDate 	= parsing(req.param('endDate'));
		endDate += " 23:59:59";
		startDate += " 00:00:01";

		Expense.find({createdAt: {'>=': new Date(startDate), '<=': new Date(endDate)}}, function (err, expense) {
			if(err) console.log('Error:' + err);

			else {
				parsingDate(expense);

				var nodeExcel = require('excel-export');
			    var conf ={};

			    conf.cols = [
				    {
				    	caption:'Fecha y Hora'.toUpperCase(),
				    	type:'string',
				    	width:20.7109375,
				    },
				    {
				    	caption:'Nombres',
				      	type:'string',
				      	width:27.7109375
				    },
				    {
				        caption:'Apellidos',
				        type:'string',
				        width:27.7109375
				    },
				    {
				        caption:'Observaciones',
				        type:'string',
				        width:27.7109375
				    },
				    {
				        caption:'Monto',
				        type:'string'
				    }
			    ];
			    conf.rows = [];

			    _.each(expense, function(exp){
					conf.rows.push([exp.createdAt, exp.firstName, exp.lastName, exp.observations, exp.moneyOutput])
				});

		      	var result = nodeExcel.execute(conf);
		      	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
		      	res.setHeader("Content-Disposition", "attachment; filename=" + "pruebita excel.xlsx");
		      	
		      	res.end(result, 'binary');

				//res.send("OK!");	
			}
	    });
	},

};

function parsingDate(data){

	_.each(data, function(sl){
		sl.createdAt = sl.createdAt.getFullYear()+'/'+(sl.createdAt.getMonth()+1)+'/'+sl.createdAt.getDate()+'  '+
			sl.createdAt.getHours()+':'+sl.createdAt.getMinutes()+':'+sl.createdAt.getSeconds();
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

