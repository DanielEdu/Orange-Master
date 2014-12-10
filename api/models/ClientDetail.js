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
		},
		weight: {
			type: 'decimal',
		},
		fatPercentage: {
			type: 'decimal',
		},
		arm: {
			type: 'decimal',
		},
		forearm: {
			type: 'decimal',
		},
		leg: {
			type: 'decimal',
		},
		calf: {
			type: 'decimal',
		},
		waist: {
			type: 'decimal',
		},
		diet: {
			type: 'text',
		},
		observations: {
			type: 'text',
			defaultsTo: '',
		}

	}
};
