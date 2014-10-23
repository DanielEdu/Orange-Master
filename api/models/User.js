/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
	schema: true,
	tableName: 'mUsers',

	attributes: {
		id_user: {
		    type: 'integer',
		    primaryKey: true,
		    autoIncrement: true
		  },
		userId: {
			type: 'string',
			required: true,
			size: 15
		},
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},
		phoneNumber: {
			type: 'string',
			size: 9
		},
		email: {
			type: 'string',
			email: true
		},
		encryptedPassword: {
  			type: 'string'
  		},
  		admin: {
  			type: 'boolean',
  			defaultsTo: false
    	},
		// Override toJSON instance method to remove password value.
		toJSON: function() {
			var obj = this.toObject();
		    delete obj.password;
		    delete obj.confirmation;
		    delete obj.encryptedPassword;
		    delete obj._csrf;
		    return obj;
		}

	},


	beforeValidation: function (values, next) {
		
      if (values.admin === 'unchecked') {
        values.admin = false;
        console.log(values.admin);
        console.log("se ejecuto false");
      } else  if (values.admin == 'on') {
        values.admin = true;
        console.log(values.admin);
        console.log("se ejecuto true");
      }
     next();
  },

	beforeCreate: function (values, next) {

	    // This checks to make sure the password and password confirmation match before creating record
	    if (!values.password || values.password != values.confirmation) {
	      return next({err: ["Password doesn't match password confirmation."]});
	    }

	    require('bcrypt').hash(values.password, 10, function (err, encryptedPassword) {
	      if (err) return next(err);
	      values.encryptedPassword = encryptedPassword;
	      // values.online= true;
	      next();
	    });
  	}

};

