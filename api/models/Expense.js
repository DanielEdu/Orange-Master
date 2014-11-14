/**
* Expense.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'tExpenses',

	attributes: {
		id_expense: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},
		moneyOutput: {
			type: 'float',
			required: true
		}


	}
};

