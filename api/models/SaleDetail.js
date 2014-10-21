/**
* SaleDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'tSaleDetails',

	attributes: {
		serviceName: {
			type: 'string',
			required: true
		},
		quantity: {
			type: 'string'
		},
		price: {
			type: 'integer'
		},
		fullPrice: {
			type :'float',
			required: true
		},
		id_sale: {
            model:'Sale'
        },
        id_service: {
            model:'Service'
        }

	}
};

