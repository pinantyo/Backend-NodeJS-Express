require('dotenv').config();
const jwt = require("jsonwebtoken");
const serverResponse = require('../response');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
	const decoded = verifyUserToken(req, res);
	if(!decoded){
		return;
	}
	return next();
};

const verifyAuthenticated = (req, res, next) => {
	let user;
}

const verifyAdmin = async (req, res, next) => {
	let user;
	const decoded = verifyUserToken(req, res);
	
	if(decoded){
		user = await User.findById(decoded.user_id);
	} else {
		return;
	}

	if (!user && user.role !== 'admin') {
  		serverResponse.error(res, 403, "Forbidden");
  		return;
	}
	return next();
};


const verifyUser = async (req, res, next) => {
	let user;
	const decoded = verifyUserToken(req, res);
	if(decoded){
		user = await User.findById(decoded.user_id);
	}
	else{
		return;
	}
	// Verify Specific User
	if (!user) {
  		serverResponse.error(res, 403, "Forbidden");
  		return ;
	}
  	return next()
};

function verifyUserToken(req, res){
	let decoded;
	const token = req.headers["x-access-token"];
	if(!token){
		serverResponse.error(res, 403, "A token is required for authentication");
		return;
	}
	try{
		decoded = jwt.verify(token, process.env.TOKEN_KEY);
	} catch(err){
		serverResponse.error(res, 401, "Invalid token");
		return;
	}
	return decoded;
}

module.exports = {verifyToken, verifyAdmin, verifyUser};
