const express = require('express');
const router = express.Router();
const path = require('path');

// Server Response
const serverResponse = require('../response');


router.use('/account', require('./account'));
router.use('/jobs', require('./jobs'));

router.all('*', (req, res) => {
	return serverResponse.error(res, 404, 'Not Found');
});

module.exports = router;