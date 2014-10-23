/**
 * SaleController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function (req, res, next) {
		District.find(function (err, distritos) {
			if (err) return next(err);
			Service.find(function (err, servicios){
				if (err) return next(err);
				res.view({
					distritos: distritos,
					servicios: servicios
				});

			})
		      
	  });
    },



    create: function (req, res, next) {
    	var saleObj = {
	      userId:     	req.param('firstName')
	    }

	    console.log(req.params.all())
	},
	
};

