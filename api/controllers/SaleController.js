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
			Service.find(function (err, servicios){
				if (err) return next(err);
				res.view({
					distritos: distritos,
					servicios: servicios
				});
			});
		});
	},


    create: function (req, res, next) {
    	
    	Client.findOne({ documentNumber: req.param('clientDocument') }, function (err, client, next) {
    		if(err) console.log('Error:' + err);
    		if(!client) return next('El cliente no existe.');



			var saleObj = {
				id_client: 		 client.id_client,
			    clienteName:     req.param('firstName')+" "+req.param('lastName'),
			    clientDocument:  req.param('clientDocument'),
			    fullPrice: 		 req.param('fullPrice')
		    };

		    Sale.create(saleObj, function (err, sale){
			    if(err){
			        console.log("lalala:"+err);
			        return res.redirect('/sale/new');
			     } 
			    console.log("Sale Header OK!    " + sale.id_sale);

			    var json = req.param('details');
			    var saleDetailObj

			    _.each(json, function(j){
			    	

			    	Service.findOne({ serviceName: j.serviceName }, function (err, service, next) {
			    		if(err) console.log('ErrorXXXXXXXX$$:' + err);
    					if(!service) return next('El servicio no existe.');
    					
    					console.log("***"+service.id_service);
    					console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    					

			    		saleDetailObj = {
							id_service: 	service.id_service,
						    quantity:     	j.quantity,
						    fullPrice: 		j.fullPrice,
						    id_sale:  		sale.id_sale,
						    serviceName: 	j.serviceName
				    	};

				    	console.log(saleDetailObj);
				    	console.log("//////////5555555555555555555555//////////////")

			    	});

			    	console.log(saleDetailObj);


				   SaleDetail.create(saleDetailObj, function (err, saleDetail, next){
				    	if(err){
				    		console.log(err);
				    		//return res.redirect('/sale/new');
				    	} 
			    	console.log("Sale Detail OK!");

			    	});

			    });


			    
		    });
	    });
	},	
};

