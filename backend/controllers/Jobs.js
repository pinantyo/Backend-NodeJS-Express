// Server response
const serverResponse = require('../response');

// Models
const Jobs = require('../models/jobs');
const User = require('../models/user');

// Socket.IO
const {io} = require('../index');

// Getting all
const getAll = async (req, res) => {
  	try {
    	const jobs = await Jobs.find({}).populate({path:'authorId'});
    	if(jobs.length == 0){
    		serverResponse.error(res, 404, "Not Found");
    		return;
    	}
    	serverResponse.ok(res,jobs);
    	return;
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
    	return;
  	}
};

// Getting One
const getOne = async (req, res) => {
	const jobs = await getJob(req, res);
  	serverResponse.ok(res, jobs);
  	return;
};

// Creating one
const createOne = async (req, res) => {
	// Check User
	try{
		const user = await User.findById(req.body.authorId);
		if(!user) {
			throw new Error("Account is needed");
		}
	} catch (err) {
		serverResponse.error(res, 403, err.message);
		return;
	}

  	const jobs = new Jobs({
    	authorId:req.body.authorId,
    	jobTitle:req.body.jobTitle,
    	jobDescription:req.body.jobDescription,
    	jobRequirements:req.body.jobRequirements,
  	});

  	try {
    	const newJob = await jobs.save();
    	const jobList = await Jobs.find().populate({path:'authorId'});
    	io.sockets.emit('new-job', jobList);
    	serverResponse.ok(res,newJob);
    	return;
  	} catch (err) {
    	serverResponse.error(res, 400, err.message);
    	return;
  	}
};

// Updating One
const patchOne = async (req, res) => {
  	const field = ['authorId', 'jobTitle', 'jobDescription', 'jobRequirements', 'status'];

  	const jobs = await getJob(req, res);

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
    	serverResponse.ok(res, updatedUser);
    	return;
  	} catch (err) {
    	serverResponse.error(res, 400, err.message);
    	return;
  	}
};

// Deleting One
const deleteOne = async (req, res) => {
  	try {
  		const jobs = await getJob(req, res);
    	await jobs.remove()
    	const jobList = await Jobs.find().populate({path:'authorId'});
    	io.sockets.emit('new-job', jobList);
    	res.json({ message: 'Deleted Jobs' })
    	return;
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
    	return;
  	}
};

const searchJob = async (req, res) => {
	try{
		const jobs = await getJobByName(req, res);
		if(jobs){
			serverResponse.ok(res, jobs);
			return;
		}
	} catch(err) {
		serverResponse.error(res, 500, err.message);
		return;
	}
};

async function getJob(req, res) {
  	let jobs;
  	try {
    	jobs = await Jobs.findById(req.params.id).populate({path:'authorId'});
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
    	return;
  	}
  	if (!jobs) {
  		serverResponse.error(res, 404, 'Not Found');
  		return;
	}
  	return jobs;
}

async function getJobByName(req, res){
	let jobs;
	try{
		jobs = await Jobs.find({jobTitle: {$regex : req.query.search, $options:"$i"}}).populate({path:'authorId'});
		if(jobs){
			serverResponse.ok(res,jobs);
			return;
		}
	} catch(err) {
		serverResponse.error(res, 500, err.message)
		return;
	}
	return jobs
}

module.exports = {getAll, getOne, createOne, patchOne, deleteOne, searchJob};