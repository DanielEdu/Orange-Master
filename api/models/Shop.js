/**
* Shop.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'mStores',

	attributes: {
		id_store: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		idStore:{
			type: 'string',
			required: true,
		},
		storeName :{
			type: 'string',
			required: true,
		},
		storeDistrict:{
			type: 'string',
			required: true,
		},
		storeAddress: {
			type: 'string',
			required: true,
		},
		phoneNumber: {
			type: 'string',
			defaultsTo: '',
			size: 9
		},
		user:{
            collection: 'User',
            via: 'id_store'
        }
	}
};

