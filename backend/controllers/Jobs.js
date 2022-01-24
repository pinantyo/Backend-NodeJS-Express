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
    	}
    	serverResponse.ok(res,jobs);
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
  	}
};

// Getting One
const getOne = async (req, res) => {
	const jobs = await getJob(req, res);
  	serverResponse.ok(res, jobs);
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
    	io.emit('new-job', jobList);
    	serverResponse.ok(res,newJob);
  	} catch (err) {
    	serverResponse.error(res, 400, err.message);
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
  	} catch (err) {
    	serverResponse.error(res, 400, err.message);
  	}
};

// Deleting One
const deleteOne = async (req, res) => {
  	try {
  		const jobs = await getJob(req, res);
    	await jobs.remove()
    	res.json({ message: 'Deleted Jobs' })
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
  	}
};

const searchJob = async (req, res) => {
	try{
		const jobs = await getJobByName(req, res);
		if(jobs){
			serverResponse.ok(res, jobs);
		}
	} catch(err) {
		serverResponse.error(res, 500, err.message);
	}
};

async function getJob(req, res) {
  	let jobs;
  	try {
    	jobs = await Jobs.findById(req.params.id).populate({path:'authorId'});
    	if (jobs.length == 0) {
      		serverResponse.error(res, 404, 'Not Found');
    	}
  	} catch (err) {
    	serverResponse.error(res, 500, err.message);
  	}
  	return jobs;
}

async function getJobByName(req, res){
	let jobs;
	try{
		jobs = await Jobs.find({jobTitle:/req.body.search/i});

		// Jobs.find({$text: {$search: /req.body.search/i}})
		// jobs = await Jobs.aggregate([{
		// 	$search: {
  //     			"index": "default",
  //     			"text": {
  //       			"path": "jobTitle",
  //       			"query": req.body.search
  //     			}
  //   		}
  //   	}]);
		// jobs = await Jobs.find({jobTitle:req.body.search})
		if(jobs.length == 0){
			serverResponse.error(res, 404, 'Not Found');
		}
	} catch(err) {
		serverResponse.error(res, 500, err.message)
	}
	return jobs
}

module.exports = {getAll, getOne, createOne, patchOne, deleteOne, searchJob};