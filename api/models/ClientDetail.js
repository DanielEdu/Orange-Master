/**
* ClientDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
 

module.exports = {
	schema: true,
	tableName: 'tClientDetails',

	attributes: {
	  	id_detail: {
		    type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		id_client: {
            model:'Client',
            required: true,
        },
		height: {
			type: 'decimal',
			defaultsTo: '',
		},
		weight: {
			type: 'decimal',
			defaultsTo: '',
		},
		fatPercentage: {
			type: 'decimal',
			defaultsTo: '',
		},
		arm: {
			type: 'decimal',
			defaultsTo: '',
		},
		forearm: {
			type: 'decimal',
			defaultsTo: '',
		},
		leg: {
			type: 'decimal',
			defaultsTo: '',
		},
		calf: {
			type: 'decimal',
			defaultsTo: '',
		},
		waist: {
			type: 'decimal',
			defaultsTo: '',
		},
		diet: {
			type: 'text',
			defaultsTo: '',
		},
		observations: {
			type: 'text',
			defaultsTo: '',
		}

	}
};
