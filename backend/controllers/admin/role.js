// Models
const User = require('../../models/user');
const Role = require('../../models/role');

// Bcrypt
const bcrypt = require('bcrypt');

// Server Response
const serverResponse = require('../../response');

// Json Web Tokens
const jwt = require('jsonwebtoken');

// Image
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)

// Role Configuration
const getAll = async (req, res) => {
	try{
		const roles = await Role.find({});
		return serverResponse.ok(res,roles);
	} catch(err) {
		serverResponse.error(res, 500, "Internal Server Error");
	}
}

const getOne = async (req, res) => {
	const role = await findOneRole(req, res);
	serverResponse.ok(res, role);
}

const createOne = async (req, res) => {
	const newRole = new Role({
		role: req.body.role
	});

	try{
		const role = await newRole.save();
		serverResponse.ok(res, role);
	}catch(err){
		serverResponse.error(res, 403, "Bad Input");
	}
}

const patchOne = async (req, res) => {
	const role = await findOneRole(req, res);
	role.role = req.body.role;

	try{
		const updated = await role.save();
		serverResponse.ok(res, updated);
	}catch(err){
		serverResponse.error(res, 403, 'Bad Input');
	}
}

const deleteOne = async (req, res) => {
	const role = await findOneRole(req, res);
	await role.remove();
	return res.json({message:"Role Deleted"});
}

async function findOneRole(req, res){
	let role;
	try{
		role = await Role.findById(req.params.id);
		if(role === 0){
			serverResponse.error(res, 404, 'Not Found');
		}
	}catch(err){
		serverResponse.error(res, 500, "Internal Server Error")
	}
	return role;

}

module.exports = {getAll, getOne, createOne, patchOne, deleteOne};