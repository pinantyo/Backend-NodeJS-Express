require('dotenv').config();
const express = require('express');
const router = express.Router();

// Models
const User = require('../models/user');

// Controllers
const userController = require('../controllers/Account');

// Middleware
const uploadImage = require('../middleware/imageUpload');
const auth = require('../middleware/auth');

// Middleware Validation
const accountValidate = require('../middleware/account');

// Route Account
router.get('/', userController.getAll);
router.get('/:id',auth.verifyToken, userController.getOne);
router.post('/', [accountValidate.checkDuplication, accountValidate.inputValidation], userController.createOne);
router.post('/login', accountValidate.inputValidation, userController.login);
router.patch('/:id', auth.verifyUser, uploadImage.userAvatar.single("image"),userController.patchOne);
router.delete('/:id', auth.verifyUser, userController.deleteOne);


// Route Account Details
router.get('/:id/detail-information', auth.verifyToken, userController.getDetails);
router.post('/:id/detail-information', auth.verifyUser, userController.postDetails);
router.patch('/:id/detail-information', auth.verifyUser, userController.patchDetails);
router.delete('/:id/detail-information', auth.verifyUser, userController.deleteDetails);

module.exports = router