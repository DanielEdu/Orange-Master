/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */


module.exports = function(req, res, ok) {

	var sessionUserMatchesId = req.session.User.id_user == req.param('id');
	var isAdmin = req.session.User.admin;

	// The requested id does not match the user's id,
	// and this is not an admin
	if (!(sessionUserMatchesId || isAdmin==='admin')) {
		var requireAdminError = {err: '    ¡Sin Permisos!'}
		req.session.flash = {
			err: requireAdminError
		}
	    res.redirect('/');
	    return;
	}

	ok();

};