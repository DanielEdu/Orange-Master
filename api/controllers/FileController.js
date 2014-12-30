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
      '<input type="file" name="avatar" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    )
    
  },

  upload: function  (req, res) {
    req.file('avatar').upload({maxBytes: 1000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
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
   
    Client.findOne(req.param('id'), function (err, client){
      console.log(client.avatarFd)
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( );

      if (!client.avatarFd) {
        client.avatarFd = "/home/daniel/Workspace/2014/Orange/OrangeApp/.tmp/uploads/1b1c58c3-d99e-4e3d-9db2-0bd4c4f7a251.jpg"
      }   
      // Stream the file down
      fileAdapter.read(client.avatarFd).on('error', function (err){
        return res.serverError(err);

      }).pipe(res);

    });

  },

  nutritionFile: function (req, res){
   
    ClientDetail.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, client){
      console.log(client[0].nutritionFile)
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( );

      
      // Stream the file down
      fileAdapter.read(client[0].nutritionFile).on('error', function (err){
        return res.serverError(err);

      }).pipe(res);
    });
  },


  workoutFile: function (req, res){
   
    Workout.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, client){
      console.log(client[0].workoutFile)
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( );

      
      // Stream the file down
      fileAdapter.read(client[0].workoutFile).on('error', function (err){
        return res.serverError(err);

      }).pipe(res);
    });
  },
 



//  ---------- metodo mas corto ----------------

/*   dow: function (req,res) {
var fs = require('fs');
      fs.readFile('.tmp/uploads/1b1c58c3-d99e-4e3d-9db2-0bd4c4f7a251.jpg', function (err, data) {
        if (err) throw err;
        res.send(data);

      });

    }*/
};