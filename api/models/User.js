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
		password: {
			type: 'string',
			required: true
		},
		// Override toJSON instance method to remove password value.
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		},

		// Check a password with the saved one.
		validPassword: function(password, callback) {
				var obj = this.toObject();
				// If there are a callback, compare async.
				if (callback) {
					 //callback (err, res)
					 return bcrypt.compare(password, obj.password, callback);
				}
				// Otherwise, compare sync.
				return bcrypt.compareSync(password, obj.password);
		  }
	},

	// Lifecycle Callbacks.
	beforeCreate: function(values, next) {
		hashPassword(values, next);
	},
	/*beforeUpdate: function(values, next) {
		if( values.password && values.new_password && values.confirm_password) {
			// If we recive a password. We will try to change for the new one.
			if ( values.new_password === values.confirm_password ) {
				// If new password and confirm password is the same.
				User.findOne(values.id).done(function(err, user) {
					if (err) return next(err);
					if( user.validPassword(values.password) ){
						// If old password is valid.
						// Ovewrite password with the new password.
						values.password = values.new_password;
						// delete password confirmation.
						delete values.confirm_password;
						// Hash the password.
						hashPassword(values, next);
					}
				});
			}
		} else {
			// Otherwise, save the same password user had.
			User.findOne(values.id).done(function(err, user) {
				if (err) {
					return next(err);
				} else {
					values.password = user.password;
					next();
				}
			});
		}
	}*/
};

var bcrypt = require('bcrypt');

function hashPassword(values, next) {
	// Generate the crypt salt.
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		// Generate the hash using the salt generated.
		bcrypt.hash(values.password, salt, function(err, hash) {
			if (err) return next(err);
			// Overwrite the password with the hash.
			values.password = hash;
			next();
		});
	 });
}
