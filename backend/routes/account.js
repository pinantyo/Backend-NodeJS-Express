const express = require('express'); //import express
const mongodb = require('mongodb');
// 1.
const router  = express.Router(); 
// 2.
const accountController = require('../controller/Account'); 
// 3.
router.post('/account', accountController); 
// 4. 
module.exports = router; // export to use in server.js