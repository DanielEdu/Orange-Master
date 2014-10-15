/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new': function (req, res) {
    	res.view();
    },

    'index': function (req, res, next) {
    	Client.find(function (err, clients) {
	    if (err) return next(err);
	      res.view({
	      	clients: clients
	      });
	  });
	},

	'show': function (req, res, next) {
	    Client.findOne(req.param('id'), function (err, client){
	      if (err) return next(err);
	      // if (!err) return next();
	      res.view({
	        client: client
	      });

	    });
	},

	'edit': function (req, res, next) {
		Client.findOne(req.param('id'), function (err, client){
			if (err) return next(err);
			//if (!err) return next();
			res.view({
				client: client
	      });
		});
	},

    create: function (req, res, next) {

	    var clientObj = {
	      documentNumber: req.param('documentNumber'),
	      firstName:    req.param('firstName'),
	      lastName:     req.param('lastName'),
	      phoneNumber:  req.param('phoneNumber'),
	      email:    	req.param('email'),
	      address: 		req.param('address')
	    }

	    Client.create(clientObj, function (err, client){
	      if(err){
	        console.log(err);
	        return res.redirect('client/new');
	      } 
	      //res.redirect('clientObj');
	      console.log("Create client OK!");
	    });
	},

	update: function (req, res, next) {
		Client.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/client/edit/' + req.param('id'));
			}
			res.redirect('/client/show/' + req.param('id'));

		});
	},

	destroy: function (req, res, next) {
		Client.findOne(req.param('id'), function (err, client){
			if(err) return next(err);
			if(!client) return next('El cliente no existe.');

			User.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/client');
			});
			
		});
	}


};

