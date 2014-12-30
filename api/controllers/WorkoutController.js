/**
 * WorkoutController
 *
 * @description :: Server-side logic for managing workouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
    	req.file('workoutFile').upload({maxBytes: 1000000},function whenDone(err, uploadedFiles) {			    
		    if (err) return res.negotiate(err);

		    var workoutObj = req.params.all();

			workoutObj.workoutFile = uploadedFiles[0].fd;

		    Workout.create(workoutObj, function (err, client){
		      if(err){
		        console.log(err);
		      } 
		      console.log("Rutina agregada")
		      res.redirect('clientdetail/workoutshow/' + client.id_client);
		    });
		});
	},
};

