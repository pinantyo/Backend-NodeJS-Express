const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const permissionSchema = new Schema({
	permission:{
		type:String,
		required:true
	}
});

module.exports = mongoose.model('Permission', permissionSchema);


