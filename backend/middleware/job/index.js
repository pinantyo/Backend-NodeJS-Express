const serverResponse = require('../../response');
const Jobs = require('../../models/jobs');

const inputValidation = async (req, res, next) => {
	const requiredFiled = ['authorId','jobTitle','jobDescription','jobRequirements'];
	try{
    	requiredFiled.forEach((field) => {
      		if(!req.body[field]){
        		throw new Error(`${field} must not be null`);
      		}
    	});
  	} catch (err) {
    	return serverResponse.error(res, 400, err.message);
  	}
	return next();
};


module.exports = {inputValidation};
