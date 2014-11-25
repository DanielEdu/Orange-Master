/**
 * SaleController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

'new': function (req, res, next) {
	District.find(function (err, distritos) {
		if (err) return next(err);
		Service.find({sort: 'id_service'},function (err, servicios){
			if (err) return next(err);
			//--------enviar los servicios que estan activos----
			var serviceCheck=[];
			_.each(servicios, function(serv){
				if(serv.state)
					serviceCheck.push(serv);
			});
			//----------------------------------------------
			res.view({
				distritos: distritos,
				servicios: serviceCheck
			});
		});
	});
},


create: function (req, res, next) {

	var sellerName = req.session.User.firstName + " " + req.session.User.lastName;
	var sellerId = req.session.User.id_user;

	Client.findOne({ documentNumber: req.param('clientDocument') }, function (err, client, next) {
		
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

		   res.send(createSale(saleObj, req, res, next));
		   console.log("Sale Detail OK!");

		}
    });
},

};

// All Functions

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
	    			return 'Venta ok!';
	    			
	    		});
	    	});
	    }); 

    });
}

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
}
