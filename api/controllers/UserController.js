/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function (req, res) {
		res.view();
    },

    'index': function (req, res, next) {
	  User.find(function (err, users) {
	    if (err) return next(err);
	      res.view({
	      	users: users
	      });
	  });
	},

    'show': function (req, res, next) {
	    User.findOne(req.param('id'), function (err, user){
	    	if (err) return next(err);
	      	//if (!err) return next();
	      	res.view({
	      		user: user
	     	 });
	    });
	},

	'edit': function (req, res, next) {
		User.findOne(req.param('id'), function (err, user){
			if (err) return next(err);
			if(!user) return next('El usuario no existe.');
			//if (!err) return next();
			res.view({
				user: user
	      });
		});
	},



	create: function (req, res, next) {

	    var userObj = {
	      userId:     	req.param('userId'),
	      firstName:    req.param('firstName'),
	      lastName:     req.param('lastName'),
	      phoneNumber:  req.param('phoneNumber'),
	      email:    	req.param('email'),
	      password: 	req.param('password')
	    }

	    User.create(userObj, function (err, user){
	      if(err){
	        console.log(err);
	        return res.redirect('user/new');
	      } 
	      res.redirect('user');
	      console.log("Create OK!");
	    });
	},


	update: function (req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));

		});
	},

	destroy: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user){
			if(err) return next(err);
			if(!user) return next('El usuario no existe.');

			User.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/user');
			});
			
		});
	}
 
};

