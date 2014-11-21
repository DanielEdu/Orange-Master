/**
* ClientDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
	schema: true,
	tableName: 'tUserDetails',

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
		workout: {
			type: 'text',
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
