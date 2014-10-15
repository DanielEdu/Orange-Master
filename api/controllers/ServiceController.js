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

    'index': function (req, res, next) {
	  Service.find(function (err, services) {
	    if (err) return next(err);
	      res.view({
	      	services: services
	      });
	  });
	},

	'show': function (req, res, next) {
	    Service.findOne(req.param('id'), function (err, service){
		    if (err) return next(err);
		    // if (!err) return next();
		    res.view({
		    	service: service
		    });

	    });
	},

	'edit': function (req, res, next) {
		Service.findOne(req.param('id'), function (err, service){
			if (err) return next(err);
			//if (!err) return next();
			res.view({
				service: service
	      });
		});
	},


	create: function (req, res, next) {

	    var serviceObj = {
	      serviceName:    req.param('serviceName'),
	      servicePrice:   req.param('servicePrice'),
	      serviceDescription: req.param('serviceDescription')
	    }

	    Service.create(serviceObj, function (err, service){
	      if(err){
	        console.log(err);
	        return res.redirect('service/new');
	      } 
	      //res.redirect('service');
	      console.log("Create OK!");
	    });
	},

	update: function (req, res, next) {
		Service.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/service/edit/' + req.param('id'));
			}
			res.redirect('/service/show/' + req.param('id'));

		});
	},

	destroy: function (req, res, next) {
		Service.findOne(req.param('id'), function (err, service){
			if(err) return next(err);
			if(!service) return next('El servicio no existe.');

			User.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/service');
			});
			
		});
	}


	
};

