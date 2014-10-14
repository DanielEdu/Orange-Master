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

	index: function (req, res, next) {
	  User.find(function (err, users) {
	    if (err) return next(err);
	      res.view({
	      	users: users
	      });
	  });
	},
 
};

