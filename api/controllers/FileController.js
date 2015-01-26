/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
/*
  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="file/upload" enctype="multipart/form-data" method="POST">'+
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
      console.log(uploadedFiles)
        // Generate a unique URL where the avatar can be downloaded.
        //avatarUrl = require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.User.id_user),
        // Grab the first file and use it's `fd` (file descriptor)
         avatarFd = uploadedFiles[0].fd
        var fs = require('fs');
        fs.readFile(avatarFd, function (err, data) {
          if (err) throw err;
          res.end(data);
        });
        
        // Save the "fd" and the url where the avatar for a user can be accessed
  
    });
  },
*/

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
      
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
     /* var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( );*/

      if (!client.avatarFd || client.avatarFd=='') {
        client.avatarFd = ".tmp/uploads/anonymous.jpg"
      }   
      // Stream the file down
      /*fileAdapter.read(client.avatarFd).on('error', function (err){
        return res.serverError(err);

      }).pipe(res);*/

      //console.log(client.avatarFd)
    
      var fs = require('fs');
        fs.readFile(client.avatarFd, function (err, data) {
          if (err) throw err;
          res.end(data);
        });


    });
  },

  nutritionFile: function (req, res){
   
    ClientDetail.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, client){
      //console.log(client[0].nutritionFile)
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

        var fs = require('fs');
        fs.readFile(client[0].nutritionFile, function (err, data) {
          if (err) throw err;          
         
          res.setHeader('Content-Type', 'application/vnd.openxmlformats');
          res.setHeader("Content-Disposition");
          res.end(data, 'binary');

        });
    });
  },


  workoutFile: function (req, res){
   
    Workout.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, client){
     // console.log(client[0].workoutFile)
      if (err) return res.negotiate(err);
      if (!client) return res.notFound();

      var fs = require('fs');
      fs.readFile(client[0].workoutFile, function (err, data) {
        if (err) throw err;       
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition");
        res.end(data, 'binary');

      });
      
    });
  },
 
/*
      fs.readFile('/home/daniel/Workspace/2014/Orange/OrangeApp/.tmp/uploads/b4efe798-861f-42c9-a8ee-9f741e492442.docx', function (err, data) {
        if (err) throw err;
        //res.send(data, 'binary');
        console.log(data)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(data, 'binary');

      });


*/

};