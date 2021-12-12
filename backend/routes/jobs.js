const express = require('express')
const router = express.Router()
const Jobs = require('../models/jobs')

// Getting all
router.get('/', async (req, res) => {
  try {
    const jobs = await Jobs.find({});
    res.send(jobs);
    // res.json(Jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:slug/:id', getJob, (req, res, next) => {
  res.json(res.jobs);
})

// Creating one
router.post('/', async (req, res, next) => {
  const jobs = new Jobs({
    authorId:req.body.authorId,
    jobTitle:req.body.jobTitle,
    jobDescription:req.body.jobDescription,
    jobRequirements:req.body.jobRequirements,
  })
  try {
    const newJob = await jobs.save()
    res.status(201).json(newJob)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:slug/:id', getJob, async (req, res) => {
  if (req.body.email != null) {
    res.jobs.email = req.body.email
  }
  if (req.body.username != null) {
    res.jobs.username = req.body.username
  }
  if (req.body.password != null) {
    res.jobs.password = req.body.password
  }
  try {
    const updatedUser = await res.jobs.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getJob, async (req, res) => {
  try {
    await res.jobs.remove()
    res.json({ message: 'Deleted Jobs' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getJob(req, res, next) {
  let jobs
  try {
    jobs = await Jobs.findById(req.params.id)
    if (jobs == null) {
      return res.status(404).json({ message: 'Cannot find jobs' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.jobs = jobs
  next()
}
module.exports = router