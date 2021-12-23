// Server response
const serverResponse = require('../response');

// Models
const Jobs = require('../models/jobs')

// Getting all
const getAll = async (req, res) => {
  	try {
    	const jobs = await Jobs.find({});
    	return serverResponse.ok(res,jobs);
  	} catch (err) {
    	return serverResponse.error(res, 500, err.message);
  	}
};

// Getting One
const getOne = async (req, res) => {
	jobs = await getJob(req, res);
  	return serverResponse.ok(res, jobs);
};

// Creating one
const createOne = async (req, res) => {
  	const jobs = new Jobs({
    	authorId:req.body.authorId,
    	jobTitle:req.body.jobTitle,
    	jobDescription:req.body.jobDescription,
    	jobRequirements:req.body.jobRequirements,
  	};

  	try {
    	const newJob = await jobs.save();
    	return serverResponse.ok(res,newJob);
  	} catch (err) {
    	return serverResponse.error(res, 400, err.message);
  	}
};

// Updating One
const patchOne = async (req, res) => {
  	const field = ['authorId', 'jobTitle', 'jobDescription', 'jobRequirements', 'status'];

  	jobs = await getJob(req, res);

  	field.forEach((field) => {
    	if(req.body[field]){
      		jobs[field] = req.body[field];
    	}
    	else if(field === 'status' && !field){
      		jobs[field] = "false";
    	}
  	});

  	try {
    	const updatedUser = await jobs.save();
    	return serverResponse.ok(res, updatedUser);
  	} catch (err) {
    	return serverResponse.error(res, 400, err.message);
  	}
};

// Deleting One
const deleteOne = async (req, res) => {
  	try {
  		jobs = await getJob(req, res);
    	await jobs.remove()
    	res.json({ message: 'Deleted Jobs' })
  	} catch (err) {
    	return serverResponse.error(res, 500, err.message);
  	}
};

async function getJob(req, res) {
  	let jobs;
  	try {
    	jobs = await Jobs.findById(req.params.id)
    	if (jobs == null) {
      		return serverResponse.error(res, 404, 'Cannot find jobs');
    	}
  	} catch (err) {
    	return serverResponse.error(res, 500, err.message);
  	}
  	return jobs;
}

module.exports = {getAll, getOne, createOne, patchOne, deleteOne};