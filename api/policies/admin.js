module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin === 'admin') {
    return ok(); 
  }

  // User is not allowed
  else {
  	var requireAdminError = {err: 'ACCESO DENEGADO! \n  tienes que ser administrador.'}
		req.session.flash = {
			err: requireAdminError
		}

    res.redirect('/');
   req.session.destroy();

    return;
  }
};