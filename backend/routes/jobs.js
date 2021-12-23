const express = require('express')
const router = express.Router()

// Server response
const serverResponse = require('../response');

// Models
const Jobs = require('../models/jobs')

// Middleware
const auth = require('../middleware/auth');

// Getting all
router.get('/', async (req, res) => {
  try {
    const jobs = await Jobs.find({});
    return serverResponse.ok(res,jobs);
    // res.json(Jobs)
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
});

// Getting One
router.get('/:slug/:id', getJob, (req, res, next) => {
  return serverResponse.ok(res, res.jobs);
});

// Creating one
router.post('/', auth.verifyToken, async (req, res, next) => {
  const jobs = new Jobs({
    authorId:req.body.authorId,
    jobTitle:req.body.jobTitle,
    jobDescription:req.body.jobDescription,
    jobRequirements:req.body.jobRequirements,
  });

  try {
    const newJob = await jobs.save();
    return serverResponse.ok(res,newJob);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
});

// Updating One
router.patch('/:slug/:id', auth.verifyUser, getJob, async (req, res) => {
  const field = ['authorId', 'jobTitle', 'jobDescription', 'jobRequirements', 'status'];

  field.forEach((field) => {
    if(req.body[field]){
      res.jobs[field] = req.body[field];
    }
    else if(field === 'status' && !field){
      res.jobs[field] = "false";
    }
  });

  try {
    const updatedUser = await res.jobs.save();
    return serverResponse.ok(res, updatedUser);
  } catch (err) {
    return serverResponse.error(res, 400, err.message);
  }
})

// Deleting One
router.delete('/:id', auth.verifyUser,getJob, async (req, res) => {
  try {
    await res.jobs.remove()
    res.json({ message: 'Deleted Jobs' })
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }
})

async function getJob(req, res, next) {
  let jobs
  try {
    jobs = await Jobs.findById(req.params.id)
    if (jobs == null) {
      return serverResponse.error(res, 404, 'Cannot find jobs');
    }
  } catch (err) {
    return serverResponse.error(res, 500, err.message);
  }

  res.jobs = jobs
  next()
}
module.exports = router