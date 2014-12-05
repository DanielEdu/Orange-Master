/**
 * WorkoutController
 *
 * @description :: Server-side logic for managing workouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
    	
	    var userObj = {
	      	id_client:    	req.param('id'),
		    observations: 	req.param('observations'),
	    }

	    Workout.create(userObj, function (err, client){
	      if(err){
	        console.log(err);
	      } 
	      console.log("rutinas creadas")
	      res.redirect('/clientdetail/workoutshow/' + client.id_client);
	    });
	},
};

