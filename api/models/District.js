/**
* District.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'mDistricts',

	attributes: {
		id_district: {
  			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		districtName: {
			type: 'string',
			required: true
		},
		districtAcronym: {
			type: 'string',
			required: true,
			size: 3
		}

	}
};

