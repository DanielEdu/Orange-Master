/****
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 ****/ 

 

 function parsingDate(data){

	_.each(data, function(sl){
		sl.createdAt = sl.createdAt.getFullYear()+'/'+(sl.createdAt.getMonth()+1)+'/'+sl.createdAt.getDate()+'  '+
			sl.createdAt.getHours()+':'+sl.createdAt.getMinutes()+':'+sl.createdAt.getSeconds();
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
					Sale.find({id_client:client.id_client, state:{'!': false }}, function (err, sale){
					   	if (err) return next(err);
				      	// if (!err) return next();
				      	if (!district){
				      		res.view({
						    	detail: parsingDate(detail),
						      	district: '',
						        client: client,
						        details: parsingDate(sale)
					    	});
				      	}else{
				      		res.view({
						    	detail: parsingDate(detail),
						      	district: district.districtName,
						        client: client,
						        details: parsingDate(sale)
					    	});
				      	}
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
				    if(!district){
				    	res.view({
					      	district: '',
					      	distritos: distritos,
					        client: client
				    	});
				    }else{
				    	res.view({
					      	district: district.districtName,
					      	distritos: distritos,
					        client: client
					    });
				    }  
				});
			});
		});
	},

    create: function (req, res, next) {


	    var clientObj = {
		    documentNumber: req.param('documentNumber'),
		    firstName:      req.param('firstName'),
		    lastName:       req.param('lastName'),
		    phoneNumber:    req.param('phoneNumber'),
		    email:    	  	req.param('email'),
		    address: 		req.param('address'),
		    district: 	  	req.param('district'),
		    sex: 	  		req.param('sex'),
		    question1: 		req.param('question1'),
	      	question2: 		req.param('question2'),
	      	question3: 		req.param('question3'),
	      	question4: 		req.param('question4'),
	      	question5: 		req.param('question5'),
	      	question6: 		req.param('question6'),
	      	question7: 		req.param('question7'),
		}     
		Client.findOne({ documentNumber: req.param('documentNumber')}, function (err, client){
			
			if(client){
				req.session.flash = {
	          		err: {
	          			err:"El DNI "+req.param('documentNumber')+" ya esta registrado.",
	          		}
	        	}
	        	console.log("El usuario ya existe")
	        	if(req.param('flag')==='2'){
	        		return res.redirect('sale/registration/');	        		
	        	}else{
	        		return res.redirect('client/new/');
	        	}
			}
			if(!client){
			    Client.create(clientObj, function (err, client){
				    if(err){
				        console.log(err);
				        if(req.param('flag')==='1'){
				        	return res.redirect('/client/new/');
				        }
				        if(req.param('flag')==='2'){
				        	return res.redirect('/sale/registration/'+req.param('documentNumber'));
				        }
				    }
				    
					var clientDetail = {
				    	id_client: 		client.id_client,
				      	weight: 		req.param('weight'),
				      	height:    		req.param('height'),
				      	fatPercentage: 	req.param('fatPercentage'),				     		    		
		    		}

		    		ClientDetail.create(clientDetail, function (err, clientDetail) {
		    		 	if(err){
					        console.log(err);
					        return res.redirect('/sale/new/');
					    }
					    console.log("Detalles creados")
					    if(req.param('flag')==='2'){
					    	return res.redirect('/sale/imcsale/?dni='+client.documentNumber+'&name='+client.firstName+'&weight='+clientDetail.weight+'&height='+clientDetail.height+'&fat='+clientDetail.fatPercentage);
		    			}
		    		});
				    
			      	console.log("Cliente creado OK!");
			      	if(req.param('flag')==='1')					//si el cliente se crea desde la venta 
			      		res.redirect('/client/show/'+client.id_client);
			    });	
			}
		});
	},

	update: function (req, res, next) {	
		var dir = req.param('id')+"/avatar"	

		req.file('avatar').upload({dirname: dir},function whenDone(err, uploadedFiles) {
			    
		    if (err) return res.negotiate(err);	
		    // Grab the first file and use it's `fd` (file descriptor)		    
		    //if(!req.param('cod')) var avatarFd = uploadedFiles[0].fd;
		   
		    var params = req.params.all();

		    if(!req.param('cod') && uploadedFiles[0]){
		    	params.avatarFd = uploadedFiles[0].fd.replace(sails.config.myconf.dirRoot,'');
		    	//console.log(params);
		    	deleteavatar(req.param('id'));  //llamar a funcion que borra el anterior avatar
		    } 


			Client.update(req.param('id'), params, function userUpdated (err){
				
				if (err) {
					return res.redirect('/client/edit/' + req.param('id'));
				}else{
				    if(!req.param('cod')){
						res.redirect('/client/show/' + req.param('id'));				
					}
					if(req.param('cod')=='4' || req.param('cod')=='6'){
						res.send("succsess cod: "+req.param('cod'));
					}	
			    }
			});				
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
		}
		if(cadena==='')
		{
			res.send("vacio")
		}
  	},

  	templateUser: function(req, res, next) {
  		var dni = req.param('dni');
		
		console.log(dni)
		if(!isNaN(dni)){
			Client.find({documentNumber:{'like': dni+'%' }}, function (err, clients) {
				var clientsObj =[];

				_.each(clients, function(clnt){					
					clientsObj.push(clnt.documentNumber+" - "+clnt.firstName+" "+clnt.lastName );
				})

				console.log(clientsObj)
				res.send({
					resp: clientsObj
				})
			});	
		}
  	},

};


//************************************//


// *****  Funcion para borrar el anterior avatar ********  //
function deleteavatar (id){
	Client.find(id, function (err, client){		
		var fs = require('fs-extra');
		if(client[0].avatarFd!=''){
			
			fs.remove(client[0].avatarFd, function (err) {
			  	if (err) return console.error (err)

			  	console.log("avatar borrado!!")
				return;
			})
		}
		return
	});
}