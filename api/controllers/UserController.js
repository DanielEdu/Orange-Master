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

	upload: function (req,res,next) {
	/*	var form = new formidable.IncomingForm();
		  form.parse(req, function(err, fields, files) {
		    res.writeHead(200, {'content-type': 'text/plain'});
		    res.write('received upload:\n\n');
		    res.end(util.inspect({fields: fields, files: files}));
		  });

		  form.on('end', function(fields, files) {
		    /* Temporary location of our uploaded file *
		    var temp_path = this.openedFiles[0].path;
		    /* The file name of the uploaded file *
		    var file_name = this.openedFiles[0].name;
		    /* Location where we want to copy the uploaded file *
		    var new_location = 'uploads/';

		    fs.copy(temp_path, new_location + file_name, function(err) {  
		      if (err) {
		        console.error(err);
		      } else {
		        console.log("success!")
		      }
		    });
		  });*/
		console.log("se subio la imagen")
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
 
	    User.create(userObj, function (err, user){
	      if(err){
	        console.log(err);
	        req.session.flash = {
          		err: err
        	}
	        return res.redirect('/user/new');
	      } 
	      res.redirect('/user/new');
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

