/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

	var sessionUserMatchesId = req.session.User.id === req.param('id_user');
	var isAdmin = req.session.User.admin;

	// The requested id does not match the user's id,
	// and this is not an admin
	if (!(sessionUserMatchesId || isAdmin==='admin')) {
		var noRightsError = [{name: 'noRights', message: 'tienes que ser admin'}]
		req.session.flash = {
			err: noRightsError
		}
    res.redirect('/');
    return;
	}

	ok();

};