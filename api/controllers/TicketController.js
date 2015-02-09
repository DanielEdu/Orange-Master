/**
 * TicketController
 *
 * @description :: Server-side logic for managing tickets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res, next) {
		District.find(function (err, districts) {
	    	if (err) return next(err);
	      	res.view({
	      		districts: districts
	      	});
	  	});
    },

    'edit': function (req, res, next) {
		Ticket.findOne(req.param('id'), function (err, ticket){
			if (err) return next(err);
			District.find(function (err, districts) {
			    if (err) return next(err);						    
		    	res.view({
			      	districts: districts,
			        ticket: ticket,
			    });			     				
			});
		});
	},

	'show': function (req, res, next) {
		Ticket.findOne(req.param('id'), function (err, ticket){
			
	    	if (err) return next(err);
	      	//if (!err) return next();
	      	res.view({
	      		ticket: ticket,
	     	});
		});    
	},

	create: function (req, res, next) {

	    var ticketObj = req.params.all();
 		
	    Ticket.create(ticketObj, function (err, ticket){
		    if(err){
		        console.log(err);
		        return res.redirect('/ticket/new');
		    } 
		    res.redirect('/ticket/show/'+ticket.id_ticket);
	    });   	
	},

	update: function (req, res, next) {

		Shop.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/ticket/edit/' + req.param('id'));
			}

			res.redirect('/ticket/show/' + req.param('id'));						
		});
	},

	
};

