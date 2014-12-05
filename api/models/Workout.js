/**
* Workouts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,
	tableName: 'tWorkout',

	attributes: {
	  	id_workout: {
		    type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		},
		workout: {
			type: 'string',
		},
		observations: {
			type: 'text',
			defaultsTo: '',
		},
		id_client: {
            model:'Client',
            required: true,
        },
	}
};

