const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Validator
const validator = require('../middleware/validator');

// Controller
const roleController = require('../controllers/admin/role');

router.get('/', [auth.verifyAdmin],roleController.getAll);
router.get('/:id',[auth.verifyAdmin],roleController.getOne);
router.post('/',[auth.verifyAdmin,validator.role.requiredField,validator.role.checkDuplication],roleController.createOne);
router.patch('/:id',[auth.verifyAdmin,validator.role.requiredField],roleController.patchOne);
router.delete('/:id',[auth.verifyAdmin], roleController.deleteOne);

module.exports = router;