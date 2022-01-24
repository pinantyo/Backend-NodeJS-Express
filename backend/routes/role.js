const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Validator
const validator = require('../middleware/validator');

// Controller
const roleController = require('../controllers/admin/role');

router.get('/',roleController.getAll);
router.get('/:id',roleController.getOne);
router.post('/',[validator.role.requiredField,validator.role.checkDuplication],roleController.createOne);
router.patch('/:id',[validator.role.requiredField],roleController.patchOne);
router.delete('/:id',roleController.deleteOne);

module.exports = router;