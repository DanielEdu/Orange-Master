module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin) {
    return ok();
  }

  // User is not allowed
  else {
  	var requireAdminError = [{name: 'requireAdminError', message: 'tienes que ser admin.'}]
		req.session.flash = {
			err: requireAdminError
		}
    res.redirect('/');
    return;
  }
};