require('dotenv').config();
const jwt = require("jsonwebtoken");
const serverResponse = require('../response');

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}

	try{
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch(err) {
		return serverResponse.error(res, 401, "Invalid token");
	}

	return next();
};

const verifyRole = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if(!token){
		return serverResponse.error(res, 403, "A token is required for authentication");
	}

	try{
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch(err) {
		return serverResponse.error(res, 401, "Invalid token");
	}
		
	return next();
};

module.exports = verifyToken;
