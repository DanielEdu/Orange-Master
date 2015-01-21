/**
 * UserdetailController
 *
 * @description :: Server-side logic for managing userdetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var clientNoHistory 	= 2;
var successFull 		= 1;
var thereIsNotClient 	= 0;

function parsingDate(data){

	_.each(data, function(sl){
		sl.createdAt = sl.createdAt.getFullYear()+'/'+(sl.createdAt.getMonth()+1)+'/'+sl.createdAt.getDate()+'  '+
			sl.createdAt.getHours()+':'+sl.createdAt.getMinutes()+':'+sl.createdAt.getSeconds();
	});

	return data
}



module.exports = {

	'show': function (req, res, next) {
	    ClientDetail.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, detail) {
	    	Client.findOne({ id_client: req.param("id") }, function (err, client) {

		    	if (err) return next(err);
		      	//if (!err) return next();
		      	//console.log(detail[0])
		      	var detailFormat = parsingDate(detail);
		      	res.view({
		      		detail: detailFormat,
		      		client: client
		      	});
		    });
	    });
	},

'workoutshow': function (req, res, next) {
	    ClientDetail.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, detail) {
	    	Client.findOne({ id_client: req.param("id") }, function (err, client) {
	    		Workout.find({ where: { id_client: req.param("id") }, sort: 'updatedAt DESC'}, function (err, workout) {

			    	if (err) return next(err);
			      	//if (!err) return next();
			      	//console.log(detail[0])
			      	var detailFormat = parsingDate(detail);
			      	var workoutDateFormat = parsingDate(workout)
			      	res.view({
			      		detail: detailFormat,
			      		client: client,
			      		workout: workoutDateFormat
			      	});
			    });
		    });
	    });
	},

    'search': function (req, res) {
		res.view();
    },

    'upgrade': function (req, res, next) {
		ClientDetail.findOne({id_client: req.param('id')}, function (err, client){
			if (err) return next(err);
			if(!client) return next('El usuario no existe.');
			//if (!err) return next();
	
			res.view({
				client: client,

			});
		});
	},

    create: function (req, res, next) {
    	req.file('nutritionFile').upload({maxBytes: 1000000},function whenDone(err, uploadedFiles) {
			    
		    if (err) return res.negotiate(err);
		    var nutritionObj = req.params.all(); 
		    // Grab the first file and use it's `fd` (file descriptor)	
			
		   	if(uploadedFiles[0]) nutritionObj.nutritionFile = uploadedFiles[0].fd;

		    ClientDetail.create(nutritionObj, function (err, client){
		      if(err){
		        console.log(err);
		      } 
		      console.log("nuevos datos de nutición creados")
		      res.redirect('/clientdetail/show/' + client.id_client);
		    });
		});  
	},

	destroy: function (req, res, next) {
		ClientDetail.findOne(req.param('id'), function (err, detail){
			if(!detail) console.log("no existe ese detalle de cliente");

			ClientDetail.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/clientdetail/show/'+detail.id_client);
			});
			
		});
	},

    findByDni: function(req, res, next) {
		var dni = req.param('dni');
		var cadena = req.param('dni');
		var resJson = {
			cod: '',
			dat: '',
			resp: ''
		}
		var obj = parseInt(dni)
		if(obj/obj === 1){
			
		}else{
			dni = 0;
		}

	    Client.find({or : [{documentNumber: dni},{firstName: {'startsWith': cadena}}, {lastName:{'startsWith': cadena }}]}, function (err, client) {
			if(err) console.log('Error:' + err);
			
			if(client.length===0){
			  	resJson.resp = "El cliente no existe o introdujo mal los datos.";
		    	resJson.cod = thereIsNotClient;
		    	res.send(resJson);
		    }
		    else {
		    	var clienId = client[0].id_client;
		    	ClientDetail.find({ id_client: clienId }, function (err, detail) {
			  		if(err) console.log('Error:' + err);
			  		//console.log(detail)
			  		if(detail.length === 0){
			  			resJson.dat = {
			  				clientName: client[0].firstName,
			  				id_client: 	client[0].id_client
			  			}
			  			resJson.resp = client[0].firstName+" aun no tiene historial =(.";
				    	resJson.cod = clientNoHistory;
				    	res.send(resJson);
			  		}else{
			  			if (req.session.User.admin==='nutritionist'){ 
			  			resJson.dat  = '/clientdetail/show/'+clienId;
			    		resJson.cod  = successFull;
				    		res.send(resJson);
				  		}
				  		if (req.session.User.admin==='trainer'){ 
				  			resJson.dat  = '/clientdetail/workoutshow/'+clienId;
				    		resJson.cod  = successFull;
				    		res.send(resJson);
				  		}
			  		}
		  		});
		  	}
	    });
  	}
};

