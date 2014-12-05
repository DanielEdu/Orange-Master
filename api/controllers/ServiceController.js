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

    'newproduct': function (req, res) {
		res.view();
    },

    'index': function (req, res, next) {
		Service.find({where: { serviceFlag: 'service' }, sort: 'serviceName'}, function (err, services) {
		    if (err) return next(err);
	      	res.view({	 
	      		services: services
	     	});
		});
	},

	'indexProducts': function (req, res, next) {
		Service.find({where: { serviceFlag: 'product' }, sort: 'serviceName'}, function (err, services) {
		    if (err) return next(err);
		    res.view({
		    	services: services
		    });
		});
	},

	'show': function (req, res, next) {
	    Service.findOne(req.param('id'), function (err, service){
		    if (err) return next(err);
		    if (!service){
		    	console.log("No hay service")
		    	//return next("servicio no hay");
		    } 
		    
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
		if (req.param('flag')==='service'){
			var serviceObj = {
		      serviceName:    		req.param('serviceName'),
		      servicePrice:   		req.param('servicePrice'),
		      serviceDescription: 	req.param('serviceDescription'),
		      serviceFlag: 			'service',
		    }
		}
		if (req.param('flag')==='product'){
			var serviceObj = {
		      serviceName:    		req.param('serviceName'),
		      servicePrice:   		req.param('servicePrice'),
		      serviceDescription: 	req.param('serviceDescription'),
		      serviceProvider: 	  	req.param('serviceProvider'),
		      serviceFlag: 			'product',
		    }
		}
	    
	    Service.create(serviceObj, function (err, service){
	      if(err){
	        console.log(err);
	        return res.redirect('service/new');
	      }
	      if (req.param('flag')==='service') {res.redirect('/service/');}
	      if (req.param('flag')==='product') {res.redirect('/service/indexProducts/');}
	      console.log("Create OK!");
	    });
	},

	update: function (req, res, next) {


		Service.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/service/edit/' + req.param('id'));
			}
			if(req.param('cod')==''){
				res.redirect('/service/show/' + req.param('id'));				
			}
			if(req.param('cod')=='4'){
				res.send("succsess");
			}
			

		});
	},

	destroy: function (req, res, next) {
		Service.findOne(req.param('id'), function (err, service, next){
			if(err) return next(err);
			if(!service) return next('El servicio no existe.');

			User.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/service');
			});
			
		});
	},

	findByName: function(req, res, next) {
		var name = req.param('service');

	    Service.findOne({ serviceName: name }, function (err, service) {
			if(err) console.log('Error:' + err);

			else {
				res.send({
					price: service.servicePrice
				});
			}
	    });
  	}

	
};

