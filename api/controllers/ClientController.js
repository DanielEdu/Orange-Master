/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */ 
 function parsingDate(data){ 

	_.each(data, function(d){
		d.createdAt = (d.createdAt).toISOString().replace(/T/, ' Hora: ').replace(/\..+/, '');
	});

	return data
}

module.exports = {
	
	'new': function (req, res, next) {
		District.find(function (err, distritos) {
	    if (err) return next(err);
	      res.view({
	      	distritos: distritos
	      });
	  });
    },

    'index': function (req, res, next) {
    	Client.find(function (err, clients) {
	    if (err) return next(err);
	      res.view({
	      	clients: clients
	      });
	  });
	},

	'show': function (req, res, next) {
	    Client.findOne(req.param('id'), function (err, client){
	    	District.findOne({ id_district: client.district }, function (err, district){
				ClientDetail.find({ where: { id_client: client.id_client }, sort: 'updatedAt DESC'}, function (err, detail) {   
					Sale.find({id_client:client.id_client}, function (err, sale){
					   	if (err) return next(err);
				      	// if (!err) return next();
				      	
				    	res.view({
					    	detail: parsingDate(detail),
					      	district: district.districtName,
					        client: client,
					        details: parsingDate(sale)
					    });
				    });
				});
			});
		});
	},

	'edit': function (req, res, next) {
		Client.findOne(req.param('id'), function (err, client){
			District.find(function (err, distritos) {
	    	District.findOne({ id_district: client.district }, function (err, district){
			    if (err) return next(err);
			      // if (!err) return next();
			    res.view({
			      	district: district.districtName,
			      	distritos: distritos,
			        client: client
			    });
			});
			});
		});
	},

    create: function (req, res, next) {
console.log(req.params.all());
	    var clientObj = {
	      documentNumber: req.param('documentNumber'),
	      firstName:      req.param('firstName'),
	      lastName:       req.param('lastName'),
	      phoneNumber:    req.param('phoneNumber'),
	      email:    	  req.param('email'),
	      address: 		  req.param('address'),
	      district: 	  req.param('district'),
	      sex: 	  		  req.param('sex')
		}
	    
	    if(req.param('flag')==='2'){

		    var clientDetail = {
		      documentNumber: req.param('weight'),
		      firstName:    req.param('height'),
		      lastName:     req.param('lastName'),
		      phoneNumber:  req.param('fatPercentage'),
    		}
	    }

	    Client.create(clientObj, function (err, client){
		    if(err){
		        console.log(err);
		        return res.redirect('client/new');
		    }
	      	if(req.param('flag')==='1')
	      		res.redirect('/client/new/');
	  		if(req.param('flag')==='2')
	  			console.log(clientDetail);
	      console.log("Cliente creado OK!");
	    });
	},

	update: function (req, res, next) {
		console.log(req.params.all())

		Client.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/client/edit/' + req.param('id'));
			}
			if(req.param('cod')==''){
				res.redirect('/client/show/' + req.param('id'));				
			}
			if(req.param('cod')=='4' || req.param('cod')=='6'){
				res.send("succsess cod: "+req.param('cod'));
			}		
		});
	},

	destroy: function (req, res, next) {
		Client.findOne(req.param('id'), function (err, client){
			if(err) return next(err);
			if(!client) return next('El cliente no existe.');

			User.destroy(req.param('id'), function (err){
				if(err) return next(err);
				res.redirect('/client/');
			});
			
		});
	},

	findById: function(req, res, next) {
		Client.findOne(req.param('id'), function (err, clients) {
			if(err) return next(err);
			res.send({client:clients })
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
			Client.findOne({ documentNumber: dni }, function (err, client){
				if(err) console.log('Error:' + err);
				if(!client){
				  	resJson.resp = "El Cliente no existe";
			    	resJson.cod = 0;
			    	res.send(resJson);
			    }
				else{
					console.log("peticion de DNI OK");
		    		resJson.dat = client;
		    		resJson.resp = "Cliente encontrado!!"
		    		resJson.cod = 1;
		    		res.send(resJson);
		    	}
				
			});
		}
		if(cadena!=='' && (obj/obj !== 1))
		{
			
			Client.find({or : [{ firstName: { 'startsWith': cadena } }, { lastName: {'startsWith': cadena } }]}, function (err, client) {
			  	if(err) console.log('Error:' + err);
				if(!client){res.send("DNI no existe");}
				//res.send("ok"+client);
				if(client.length>0){
					//res.send("existe la cadena")
					var data = []

					_.each(client, function(i){
						console.log(i.firstName+" "+i.lastName);
						data.push("<option value='"+i.firstName+" "+i.lastName+"'>");
						
					});
					res.send(data);
				}
			});
		}if (cadena==='')
		{
			res.send("vacio")
		}

	    
		 /* if(!client){
		  	resJson.resp = "El Cliente no existe";
	    	resJson.cod = 0;
	    	res.send(resJson);
	    	 }
		  else {
	    		console.log("peticion de DNI OK");
	    		resJson.dat = client;
	    		resJson.resp = "Cliente encontrado!!"
	    		resJson.cod = 1;
	    		res.send(resJson);
	    	}*/
	   
  	}


};

