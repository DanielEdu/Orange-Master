/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'mRoles',

	attributes: {
		id_role: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		roleName: {
			type: 'string',
			required: true
		},
		roleDescrioption: {
			type: 'text'
		}
	}
};

