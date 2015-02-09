/*****************************************************************
 * SaleController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 *****************************************************************/

module.exports = { 

	'new': function (req, res, next) {

		var systemDate = new Date();

		Service.find({sort: 'id_service'},function (err, servicios){
			Ticket.find(function (err, ticket) {
				Shop.findOne({id_store:req.session.User.id_store},function (err, store){
					if (err) return next(err);
					
					
					//--------enviar los servicios que estan activos----

					var serviceCheck=[];
					_.each(servicios, function(serv){
						if(serv.state)
							serviceCheck.push(serv);
					});

					var systemDateFormat = systemDate.getFullYear()+'/'+(systemDate.getMonth()+1)+'/'+(systemDate.getDate()+1)+"   "+systemDate.getHours()+":"+systemDate.getMinutes();
					
					//-------------si el parametro existe----------------

					if(!store){
						res.view({
							ticket: 		ticket,
							storeName: 		'',
							storeAddress: 	'',
							storeDistrict: 	'',
							storeId: 		'',
							systemDate: 	systemDateFormat,
							servicios: 		serviceCheck,
							dni:  			req.param('id'),
							flag: 1
						});
					} else{					
						if(req.param('id')){
							res.view({
								ticket: 		ticket,
								storeName: 		store.storeName,
								storeAddress: 	store.storeAddress,
								storeDistrict: 	store.storeDistrict,
								storeId: 		store.idStore,
								systemDate: 	systemDateFormat,
								servicios: 		serviceCheck,
								dni:  			req.param('id'),
								flag: 1
							});
						}
						if(!req.param('id')){
							res.view({
								ticket: 		ticket,
								storeAddress: 	store.storeAddress,
								storeDistrict: 	store.storeDistrict,
								storeName: 		store.storeName,
								storeId: 		store.idStore,
								systemDate: 	systemDateFormat,
								servicios: 		serviceCheck,
								dni: '',
								flag: 0
							});
						}
					}
				});
			});			
		});	
	},

	'registration': function (req, res, next){
		District.find(function (err, districts) {
			if (err) return next(err);
			//----------------------
			var dni = req.param('id');
			res.view({
				districts: districts,
				dni:dni
			});
		});
	},

	'imcsale': function (req, res, next){
		var imc  = (req.param('weight')/Math.pow(req.param('height'), 2)).toFixed(2) 
		res.view({
			dni: 	req.param('dni'),
			name: 	req.param('name'),
			weight: req.param('weight'),
			height: req.param('height'),
			fat: 	req.param('fat'),
			imc: 	imc
		});
	},

	create: function (req, res, next) {

		var sellerName = req.session.User.firstName + " " + req.session.User.lastName;
		var sellerId = req.session.User.id_user;

		Client.findOne({ documentNumber: req.param('clientDocument') }, function (err, client) {
			if(err){
				console.log("error:"+err);
			    return res.redirect('/sale/new');
			}
			
			var saleObj = {
						id_client: 		 client.id_client,
						clienteName:     req.param('firstName')+" "+req.param('lastName'),
						clientDocument:  req.param('clientDocument'),
						id_user: 		 sellerId,
						sellerName: 	 sellerName,
						fullPrice: 		 req.param('fullPrice')
					};
			
			Sale.create(saleObj, function (err, sale){
			    if(err){
			        console.log("error:"+err);
			        return res.redirect('/sale/new');
			     } 
			    console.log("Sale Header OK!  " + sale.id_sale);

			    var json = req.param('details');
			    var saleDetailObj

			    _.each(json, function(j){	    	

			    	Service.findOne({ serviceName: j.serviceName }, function (err, service) {
			    		//console.log(service);
			    		if(err) console.log('Error:' + err);

			    		saleDetailObj = {
							id_service: 	service.id_service,
						    quantity:     	j.quantity,
						    fullPrice: 		j.endPrice,
						    id_sale:  		sale.id_sale,
						    serviceName: 	j.serviceName,
						    unityPrice: 	j.unityPrice
				    	};

				    	SaleDetail.create(saleDetailObj, function (err, saleDetail){
					    	if(err){
					    		console.log(err);
					    		return res.redirect('/sale/new/');
					    	}
					    	var date = getDateFormat();
					    	var resp = {
					    		resp: sale.id_sale,
					    		date: date,
					    	}
			    			res.send(resp);
					    	console.log("Sale Detail Success! pertenece a: "+sale.id_sale);
			    			
			    		});
			    	});
			    }); 
			});
		});
		/*Client.findOne({ documentNumber: req.param('clientDocument') }, function (err, client, next) {
			
			if(err) console.log('Error:' + err);
			if(!client){
				console.log("cliente no existe y se creara.");
				createClient(saleObj, req, res, sellerName, sellerId);
			} 
			else{
				var saleObj = {
					id_client: 		 client.id_client,
					clienteName:     req.param('firstName')+" "+req.param('lastName'),
					clientDocument:  req.param('clientDocument'),
					id_user: 		 sellerId,
					sellerName: 	 sellerName,
					fullPrice: 		 req.param('fullPrice')
				};
			}
	    });*/
	},

	update: function (req, res, next) {	
		console.log(req.params.all())	
		Sale.update(req.param('id'), req.params.all(), function (err){ 	
			SaleDetail.update({id_sale:req.param('id')},{state:req.param('state')}, function (err){
				if(err) console.log(err);
				res.send("Update success");
			});		
		});       
	},

};

// All Functions
/*
function createSale(saleObj, req, res ){
	 Sale.create(saleObj, function (err, sale, res){
	    if(err){
	        console.log("error:"+err);
	        return res.redirect('/sale/new');
	     } 
	    console.log("Sale Header OK!    " + sale.id_sale);

	    var json = req.param('details');
	    var saleDetailObj

	    _.each(json, function(j){	    	

	    	Service.findOne({ serviceName: j.serviceName }, function (err, service) {
	    		//console.log(service);
	    		if(err) console.log('Error:' + err);

	    		saleDetailObj = {
					id_service: 	service.id_service,
				    quantity:     	j.quantity,
				    fullPrice: 		j.endPrice,
				    id_sale:  		sale.id_sale,
				    serviceName: 	j.serviceName,
				    unityPrice: 	j.unityPrice
		    	};

		    	SaleDetail.create(saleDetailObj, function (err, saleDetail){
			    	if(err){
			    		console.log(err);
			    		return res.redirect('/sale/new');
			    	}
	    			return "sale.id_sale";
	    			
	    		});
	    	});
	    }); 

    });
}
*/

function getDateFormat(){
	var systemDate = new Date();

	var day 	= systemDate.getDate();
	var month 	= systemDate.getMonth()+1;
	var year 	= systemDate.getFullYear();

	if(day<10){
		day = '0' + day;
	}
	if(month<10){
		month = '0' + month;
	}
	return day+"/"+month+"/"+year+' - '+systemDate.getHours()+':'+systemDate.getMinutes()+':'+systemDate.getSeconds();
}



/*  CREAR CLIENTE DESDE EL MODULO DE VENTA SI ESTE NO EXISTIERA

function createClient (saleObj, req, res, sellerName, sellerId){
	var clientObj = {
	      documentNumber: req.param('clientDocument'),
	      firstName:    req.param('firstName'),
	      lastName:     req.param('lastName'),
	      phoneNumber:  req.param('phoneNumber'),
	      email:    	req.param('email'),
	      address: 		req.param('address'),
	      district: 	req.param('district')
	    }
	    console.log(req.session.User);
    Client.create(clientObj, function (err, client){
	    if(err){
	        console.log("Error al crear User: "+err);
	        return res.redirect('client/new');
	    } 
	    console.log("Cliente creado OK!");
	    var saleObj = {
	    	id_client: 		client.id_client,
	    	clienteName:    req.param('firstName')+" "+req.param('lastName'),
	    	clientDocument: req.param('clientDocument'),
			fullPrice: 		req.param('fullPrice'),
			id_user: 		sellerId,
			sellerName: 	sellerName,
		};

	    createSale(saleObj, req, res);
    });
}*/
