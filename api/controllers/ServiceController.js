/**
 * ServiceController
 *
 * @description :: Server-side logic for managing Services
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new': function (req, res) {
		res.view();
    },


	create: function (req, res, next) {

	    var serviceObj = {
	      serviceName:    req.param('serviceName'),
	      servicePrice:   req.param('servicePrice'),
	      serviceDescription: req.param('serviceDescription')
	    }

	    Service.create(serviceObj, function (err, user){
	      if(err){
	        console.log(err);
	        return res.redirect('service/new');
	      } 
	      //res.redirect('service');
	      console.log("Create OK!");
	    });
	},
	
};

