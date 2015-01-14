/**
* Sale.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'tSales',

	attributes: {

		id_sale: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},
		clienteName: {
			type: 'string',
			required: true
		},
		clientDocument: {
			type: 'integer',
			required: true
		},
		fullPrice: {
			type :'decimal',
			required: true
		},
		sellerName: {
			type: 'string',
			required: true
		},
		state: {
			type: 'boolean',
			defaultsTo: true
		},
		observations: {
			type: 'text',
			defaultsTo: ''
		},
		id_user: {
			model:'User'
		},
		id_client: {
            model:'Client'
        },
        saleDetail:{
            collection: 'SaleDetail',
            via: 'id_sale'
        }	
	}
};

