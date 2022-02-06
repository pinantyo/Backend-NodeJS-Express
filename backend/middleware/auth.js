require('dotenv').config();
const jwt = require("jsonwebtoken");
const serverResponse = require('../response');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	const decoded = verifyUserToken(token);
	return next();
};

const verifyAuthenticated = (req, res, next) => {
	let user;
}

const verifyAdmin = async (req, res, next) => {
	let user;
	const token = req.headers["x-access-token"];

	const decoded = verifyUserToken(token);
	user = await User.findById(decoded.user_id);

	if (!user && user.role === 'user') {
  		return serverResponse.error(res, 403, "Forbidden");
	}
		
	return next();
};


const verifyUser = async (req, res, next) => {
	let user;
	const token = req.headers["x-access-token"];
	const decoded = verifyUserToken(token);
	user = await User.findById(decoded.user_id);
		
	// Verify Specific User
	if (!user) {
  		return serverResponse.error(res, 403, "Forbidden");
	}
  	return next()
};

function verifyUserToken(token){
	let decoded;
	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}
	try{
		decoded = jwt.verify(token, process.env.TOKEN_KEY);
	} catch(err){
		return serverResponse.error(res, 401, "Invalid token");
	}
	return decoded;
}

module.exports = {verifyToken, verifyAdmin, verifyUser};
