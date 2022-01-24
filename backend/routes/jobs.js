const express = require('express')
const router = express.Router()

// Server response
const serverResponse = require('../response');

// Models
const Jobs = require('../models/jobs')

// Middleware
const auth = require('../middleware/auth');

// Middleware Validation
// Middleware Validation
const validator = require('../middleware/validator/job');

// Controller
const jobController = require('../controllers/Jobs');


router.get('/', jobController.getAll);
router.get('/:slug/:id', jobController.getOne);
router.post('/', [auth.verifyToken, validator.inputValidation], jobController.createOne);
router.patch('/:slug/:id', auth.verifyUser, jobController.patchOne);
router.delete('/:slug/:id', auth.verifyUser, jobController.deleteOne);
router.get('/search', jobController.searchJob);

module.exports = router;