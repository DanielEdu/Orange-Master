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
	  User.find({ firstName: { '!': 'root'}}, function (err, users) {
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
		    firstName:    	req.param('firstName'),
		    lastName:     	req.param('lastName'),
		    phoneNumber:  	req.param('phoneNumber'),
		    email:    		req.param('email'),
		    confirmation: 	req.param('confirmation'),
		    password: 		req.param('password'),
		    saleSerialized: req.param('saleSerialized'),
		    admin: 			req.param('admin')
	    }
 	
	 	User.find({ userId: req.param('userId')}, function (err, user){
		    if(user) {
		    	req.session.flash = {
	          		err: {
	          			err:"El ID "+req.param('userId')+" ya esta en uso.",
	          		}
	        	}
	        	console.log("El usuario ya existe")
	        	return res.redirect('/user/new');
		    }
		    if(!user){
			    User.create(userObj, function (err, user){
			      if(err){
			        console.log(err);
			        req.session.flash = {
		          		err: err
		        	}
			        return res.redirect('/user/new');
			      } 
			      res.redirect('/user/show/'+user.id_user);
			    });   	
		    }
		});
	},

	update: function (req, res, next) {		
	
		if(req.param('cod')=='4'){
			var userObj = {
				state: req.param('state')
	      	}
	    }
	    if(req.param('cod')=='5')
	    {
	    	var userObj = {
				admin: req.param('admin')
	      	}
	    }
	    if(req.param('cod')=='')
	    {
	    	var userObj = {
		        firstName:   req.param('firstName'),
	      		lastName:    req.param('lastName'),
	      		phoneNumber: req.param('phoneNumber'),
	      		email:    	 req.param('email'),
	      		confirmation:req.param('confirmation'),
		    	password: 	 req.param('password'),		        
		    }
	    }

	    //-----------------------------------------------------------------

		User.update(req.param('id'), userObj, function (err){ 
			
			if(err){
		        console.log(err);
		        req.session.flash = {
	          		err: err
	        	}
		        return res.redirect('/user/edit/' + req.param('id'));
		    } 
			if (req.param('cod')=='') {
				res.redirect('/user/show/' + req.param('id'));
			}
			if(req.param('cod')=='5' || req.param('cod')=='4')
			{
				
				res.send("Update success");
			}

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

