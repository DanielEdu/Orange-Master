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
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },

  upload: function  (req, res) {
    var uploadPath = 'assets/file/';
  	req.file('avatar').upload(function onUploadComplete (err, files) {             
		if (err)
			return res.serverError(err);
    console.log(files);

	    
	 });
  },

  show: function(req, res) {
  	res.attachment('complementario');
  }

};