const serverResponse = require('../../response');
const User = require('../../models/user');

const checkDuplication = async (req, res, next) => {
	let user=false;
	const email = req.body.email;
	try{
		user = await User.find({email});
		if(user.length){
			return serverResponse.error(res, 422, "Duplication Account Detected");
		}
	} catch(err) {
		return serverResponse.error(res, 500, "Internal Server Error");
	}
	return next();
};

const inputValidation = (req, res, next) => {
	const requiredFiled = ['email', 'password'];
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
}


module.exports = {checkDuplication, inputValidation};
