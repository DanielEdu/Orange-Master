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
			unique: true
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
		state: {
			type: 'boolean',
			defaultsTo: true
		},
		encryptedPassword: {
  			type: 'string',
  			defaultsTo: '',
  		},
  		avatarUrl: {
  			type: 'string',
  			defaultsTo: '',
  		},
  		admin: {
  			type: 'string',
  			enum: ['admin', 'user', 'trainer','nutritionist'],
  			defaultsTo: 'user',
  			columnName: 'userRole'
  		},
    	sales:{
            collection: 'Sale',
            via: 'id_user'
        },
        id_store: {
            model:'Shop'
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

	/*beforeValidation: function (values, next) {
		
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
  },*/

	beforeCreate: function (values, next) {

	    // This checks to make sure the password and password confirmation match before creating record
	    if (!values.password || values.password != values.confirmation) {
	      return next({err: "Las contraseñas no coinsiden.. "});
	    }
	    
	    require('bcrypt').hash(values.password, 10, function (err, encryptedPassword) {
	      if (err) return next(err);
	      values.encryptedPassword = encryptedPassword;
	      // values.online= true;
	      next();
	    });
  	},

  	beforeUpdate: function (values, next) {

	    // This checks to make sure the password and password confirmation match before creating record
	    if(values.password){	//valida si es cambio de estado o de rol para no buscar el atribut ocontraseña
		    if (!values.password || values.password != values.confirmation) {
		      return next({err: "Las contraseñas no coinsiden. "});
		    }
		    
		    require('bcrypt').hash(values.password, 10, function (err, encryptedPassword) {
		      if (err) return next(err);
		      values.encryptedPassword = encryptedPassword;
		      // values.online= true;
		      next();
		    });
		}else{

			next();	
		}		
  	}

};


