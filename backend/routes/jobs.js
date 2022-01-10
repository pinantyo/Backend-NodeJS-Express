const express = require('express')
const router = express.Router()

// Server response
const serverResponse = require('../response');

// Models
const Jobs = require('../models/jobs')

// Middleware
const auth = require('../middleware/auth');

// Controller
const jobController = require('../controllers/Jobs');

// Getting all
router.get('/', jobController.getAll);

// Getting One
router.get('/:slug/:id', jobController.getOne);

// Creating one
router.post('/', auth.verifyToken, jobController.createOne);

// Updating One
router.patch('/:slug/:id', auth.verifyUser, jobController.patchOne);

// Deleting One
router.delete('/:slug/:id', auth.verifyUser, jobController.deleteOne);

// Search Related
router.get('/search', jobController.searchJob);

module.exports = router;