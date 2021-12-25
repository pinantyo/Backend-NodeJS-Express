require('dotenv').config();
const jwt = require("jsonwebtoken");
const serverResponse = require('../response');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}

	try{
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
	} catch(err) {
		return serverResponse.error(res, 401, "Invalid token");
	}

	return next();
};


const verifyAdmin = async (req, res, next) => {
	let user;
	const token = req.headers["x-access-token"];

	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}

	try{
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		user = await User.findById(decoded.user_id);

		if (!user && user.role === 'user') {
      		return serverResponse.error(res, 403, "Forbidden");
    	}
		
	} catch(err) {
		return serverResponse.error(res, 401, "Invalid token");
	}
		
	return next();
};


const verifyUser = async (req, res, next) => {
	let user;

	const token = req.headers["x-access-token"];
	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}


	try{
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		user = await User.findById(decoded.user_id);
		
		// Verify Specific User
		if (!user || req.params.id !== decoded.user_id) {
      		return serverResponse.error(res, 403, "Forbidden");
    	}

	} catch(err) {
		return serverResponse.error(res, 401, "Invalid token");
	}
  	
  	return next()
};

module.exports = {verifyToken, verifyAdmin, verifyUser};
