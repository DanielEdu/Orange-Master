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
			required: true,
			unique: true
		},
		firstName: {
			type: 'string',
			required: true,
		},
		lastName: {
			type: 'string',
			required: true,
		},
		sex: {
			type: 'boolean',
			required: true,
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
        state: {
			type: 'boolean',
			defaultsTo: true
		},
        sales:{
            collection: 'Sale',
            via: 'id_client'
        },
        question1: {
			type: 'text',
			defaultsTo: ''
		},
		question2: {
			type: 'text',
			defaultsTo: ''
		},
		question3: {
			type: 'text',
			defaultsTo: ''
		},
		question4: {
			type: 'text',
			defaultsTo: ''
		},
		question5: {
			type: 'text',
			defaultsTo: ''
		},
		question6: {
			type: 'text',
			defaultsTo: ''
		},
		question7: {
			type: 'text',
			defaultsTo: ''
		},
        observations: {
			type: 'text',
			defaultsTo: ''
		},
        clientDetail:{
            collection: 'ClientDetail',
            via: 'id_client'
        },
        workout:{
            collection: 'Workout',
            via: 'id_client'
        },

  }
};

