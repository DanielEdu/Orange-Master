/**
 * ShopController
 *
 * @description :: Server-side logic for managing shops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    	Shop.find(function (err, stores) {
		    if (err) return next(err);
		    res.view({
		      	stores: stores
		    });
	  	});
	},

	'show': function (req, res, next) {
		Shop.findOne(req.param('id'), function (err, store){
			District.findOne({ id_district: store.storeDistrict }, function (err, district){
		    	if (err) return next(err);
		      	//if (!err) return next();
		      	res.view({
		      		store: store,
		      		district: district.districtName,
		     	 });
		    });
		});    
	},

	'edit': function (req, res, next) {
		Shop.findOne(req.param('id'), function (err, store){
			if (err) return next(err);
			if(!store) return next('La tienda no existe.');
			District.find(function (err, distritos) {
		    	District.findOne({ id_district: store.storeDistrict }, function (err, district){
				    if (err) return next(err);						    
			    	res.view({
				      	district: district.districtName,
				      	distritos: distritos,
				        store: store
				    });			     
				});
			});
		});
	},

	create: function (req, res, next) {

	    var storeObj = req.params.all();
 		
	    Shop.create(storeObj, function (err, store){
	      if(err){
	        console.log(err);
	        return res.redirect('/shop/new');
	      } 
	      res.redirect('/shop/show/'+store.id_store);
	    });   	
	},

	update: function (req, res, next) {

		Shop.update(req.param('id'), req.params.all(), function userUpdated (err){
			if (err) {
				return res.redirect('/shop/edit/' + req.param('id'));
			}

			res.redirect('/shop/show/' + req.param('id'));						
		});
	},

};

