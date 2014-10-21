/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,
	tableName: 'mClients',

	attributes: {
		id_client: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		documentNumber: {
			type: 'integer',
			required: true
		},
		firstName: {
			type: 'string',
			required: true,
			size: 40
		},
		lastName: {
			type: 'string',
			required: true,
			size: 40
		},
		phoneNumber: {
			type: 'string',
			size: 9
		},
		email: {
			type: 'string',
			email: true
		},
		address: {
			type: 'string'
		},
		district:{
            model: 'District'
        },
        sales:{
            collection: 'Sale',
            via: 'id_client'
        }

  }
};

