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
  },

  upload: function  (req, res) {
      req.file('avatar').upload(function (err, uploadedFiles) {
        if (err) return res.send(500, err);
        return res.json({
          message: uploadedFiles.length + ' file(s) uploaded successfully!',
          files: uploadedFiles
        });
      });
  },

  show: function(req, res) {
  	var fs = require('fs');
    var filePath = 'tmp/uploads/';
    var stat = fs.statSync(filePath);

    response.writeHead(200, {
        
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  }

};