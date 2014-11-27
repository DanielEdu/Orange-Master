module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin === 'admin') {
    return ok(); 
  }

  // User is not allowed
  else {
  	var requireAdminError = {message: 'PERMISO DENEGADO! \n  tienes que ser administrador.'}
		req.session.flash = {
			err: requireAdminError
		}
    res.redirect('/');
    return;
  }
};