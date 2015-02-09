/**
* Ticket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
	tableName: 'mTickets',

  	attributes: {
	  	id_ticket: {
			type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		rSocial :{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
		phoneNumber:{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
		address:{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
		district:{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
		city:{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
		footer:{
			type: 'string',
			required: true,
			defaultsTo: '',
		},
  	}

};

