/**
 * WorkoutController
 *
 * @description :: Server-side logic for managing workouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
		var dir = req.param('id_client')+"/workoutsdir"
    	req.file('workoutFile').upload({dirname: dir},function whenDone(err, uploadedFiles) {			    
		    if (err) return res.negotiate(err);
		    var workoutObj = req.params.all();

			if(uploadedFiles[0]) workoutObj.workoutFile = uploadedFiles[0].fd.replace(sails.config.myconf.dirRoot,'');
			console.log(workoutObj)
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

