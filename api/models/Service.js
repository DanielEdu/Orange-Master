/**
* Service.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,
	tableName: 'mServices',

	attributes: {
		id_service: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		serviceName: {
			type: 'string',
			required: true,
			size: 70
		},
		servicePrice: {
			type: 'decimal',
			required: true

		},
		serviceDescription: {
			type: 'text'
		},
		serviceProvider: {
			type: 'string',
			defaultsTo: ''
		},
		serviceFlag: {
			type: 'string',
  			enum: ['product', 'service'],
		},
		state: {
			type: 'boolean',
			defaultsTo: true
		},
	}
};

