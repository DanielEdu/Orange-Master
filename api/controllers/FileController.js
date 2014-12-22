/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="POST">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
    console.log(req.session.User.id_user)
  },

  upload: function  (req, res) {
    req.file('avatar').upload({maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
     
        // Generate a unique URL where the avatar can be downloaded.
        avatarUrl = require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.User.id_user),
        // Grab the first file and use it's `fd` (file descriptor)
         avatarFd = uploadedFiles[0].fd

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // Stream the file down
      fileAdapter.read(avatarFd).on('error', function (err){
          return res.serverError(err);
        }).pipe(res);

      // Save the "fd" and the url where the avatar for a user can be accessed
     /* User.update(req.session.User.id_user, file, function (err){   
          if(err){
            console.log('err: ' + err);
        } 
        
        console.log("se gusrdo la imagen")
      })*/
    });
  },


/**
 * Download avatar of the user with the specified id
 *
 * (GET /user/avatar/:id)
 */
avatar: function (req, res){

  req.validate({
    id: 'string'
  });

  User.findOne(req.param('id')).exec(function (err, user){
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // Stream the file down
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}

  

};