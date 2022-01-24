// Error
const serverResponse = require('../../response');

// Models
const Role = require('../../models/role');

const requiredField = (req, res, next) => {
	const fields = ['role'];
	fields.forEach(field => {
		if(!req.body[field]){
			throw new Error(`${field} must not be null`);
		}
	});
	return next();
}

const checkDuplication = async (req, res, next) => {
	try{
		const role = await Role.find({role:req.body.role});
		if(role.length !== 0){
			throw new Error(`${req.body.role} has duplication`);
		}
	}catch(err){
		throw new Error('Internal Server Error');
	}
	return next();
}

module.exports = {requiredField, checkDuplication}