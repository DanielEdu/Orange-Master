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

    create: function (req, res, next) {

	    var clientObj = {
	      documentNumber: req.param('documentNumber'),
	      firstName:    req.param('firstName'),
	      lastName:     req.param('lastName'),
	      phoneNumber:  req.param('phoneNumber'),
	      email:    	req.param('email'),
	      address: 		req.param('address')
	    }

	    Client.create(clientObj, function (err, user){
	      if(err){
	        console.log(err);
	        return res.redirect('client/new');
	      } 
	      //res.redirect('clientObj');
	      console.log("Create client OK!");
	    });
	},
};

