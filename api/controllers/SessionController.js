/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

	'new': function (req, res, next) {
		req.session.authenticated=false;
		req.session.destroy();
		console.log("Ay!!!")
		res.view();
    },

    create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('email') || !req.param('password')) {
			// return next({err: ["Password doesn't match password confirmation."]});
			var usernamePasswordRequiredError = {
				//name: 'usernamePasswordRequired',
				message: 'Debe introducir el nombre de usuario y contraseña.'
			}
			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}
			res.redirect('/');
			return; 
		}
		// Try to find the user by there email address. 
		// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
		// User.findOneByEmail(req.param('email')).done(function(err, user) {
		User.findOneByUserId(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);
			// If no user is found...
			if (!user) {
				var noAccountError = {
					//name: 'noAccount',
					message: 'El Usuario ' + req.param('email') + ' no se encontro.'
				}
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/');
				return;
			}
			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = {
						//name: 'usernamePasswordMismatch',
						message: 'Combinación de usuario y/o contraseña incorrecta'
					}
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/');
					return;
				}
				if(user.state===false){
					var userDisabled = {
						//name: 'userDisabled',
						message: 'Su usuario esta desabilitado, si es un error contáctese con su administrador'
					}
					req.session.flash = {
						err: userDisabled
					}
					res.redirect('/');
					return;
				}
				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				// Change status to online
				//user.online = true;
				//user.save(function(err, user) {
					//if (err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
					/*User.publishUpdate(user.id_user, {
						loggedIn: true,
						id: user.id_user,
						name: user.firstName,
						action: ' has logged in.'
					});*/

					// If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
					// This is used in conjunction with config/policies.js file
					if (req.session.User.admin==='trainer') {
						res.redirect('/clientdetail/search/');
						return;
					}
					if (req.session.User.admin==='nutritionist') {
						res.redirect('/clientdetail/search/');
						return;
					}

					//Redirect to their profile page (e.g. /views/user/show.ejs)
					res.redirect('/sale/new/');
				//});
			});
		});
	},


	destroy: function(req, res, next) {

		User.findOne(req.session.User.id_user, function foundUser(err, user) {
			var userId = req.session.User.id_user;
			/*if (user) {
				// The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
				User.update(userId, {
					online: false
				}, function(err) {
					if (err) return next(err);

					// Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
					User.publishUpdate(userId, {
						loggedIn: false,
						id: userId,
						name: user.name,
						action: ' has logged out.'
					});

					// Wipe out the session (log out)
					req.session.destroy();

					// Redirect the browser to the sign-in screen
					res.redirect('/');
				});
			} else {*/

				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/');
			//}
		});
	}
	
};

