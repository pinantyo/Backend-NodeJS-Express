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

// Route Account
router.get('/', userController.getAll);
router.get('/:id',userController.getOne);
router.post('/', userController.createOne);
router.post('/login', userController.login);
router.patch('/:id', auth.verifyUser, uploadImage.userAvatar.single("image"),userController.patchOne);
router.delete('/:id', auth.verifyUser, userController.deleteOne);


// Route Account Details
router.get('/:id/detail-information', userController.getDetails);
router.post('/:id/detail-information', auth.verifyUser, userController.postDetails);
router.patch('/:id/detail-information', auth.verifyUser, userController.patchDetails);
router.delete('/:id/detail-information', auth.verifyUser, userController.deleteDetails);


// // Getting One
// router.get('/:id', auth.verifyToken, getUser, (req, res) => {
//   return serverResponse.ok(res, res.user);
// })
module.exports = router